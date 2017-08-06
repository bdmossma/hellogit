angular.module('app', [], function() {});
FileUploadController.$inject = ['$scope', '$http'];

function FileUploadController(scope, http) {

	// initialize file listing as empty array
    scope.files = [];

	scope.listUploadedFiles = function() {

	    scope.files = [];//reset the file listing before refreshing it

		// Use the users API which has been deployed
        // in the Amazon Cloud
        var filesApi = "/apis/files/";//this URL is relative to base URL
        var httpResponse = http.get(filesApi);

        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(files) {
				console.log("listing files in JSON array: ");
	            for(var fileIndex in files){
					console.log("name: " + files[fileIndex].name + ", size: " + files[fileIndex].size);

					// create new empty File with read-only properties initialized
					var file = new File([""], files[fileIndex].name, {});
					// add some custom properties to the new file
					// for our own tracking purposes
					file.progressVisible = false;
					file.progress = 0;
					file.status = "uploaded";
					// TODO: Workaround: create custom size property intead of
					// using existing ready-only size property
					file.sizeInBytes = files[fileIndex].size;
                    scope.files.push(file);
	            }
        });
	}

	scope.listUploadedFiles();//get fresh listing of already uploaded files

	// return -1 if not found,
	// else, return index where it was found
	scope.indexOfFileInListing = function(filename) {
		console.log("checking if " + filename + " is already in file listing");
		for(var fileIndex in scope.files){
			var existingFilename = scope.files[fileIndex].name;
			console.log("existing name: "+ existingFilename);
			if(filename === existingFilename) {
				return fileIndex;
			}
		}
		return -1;
	}

	scope.removeFileFromListing = function(fileIndexToRemove) {
		var numberOfFileIndicesToRemove = 1;//just remove one item from this position
		scope.files.splice(fileIndexToRemove, numberOfFileIndicesToRemove);
	}

	// input parameter is an array of
	// HTML5 File objects
	scope.addSelectedFilesToListing = function(files) {
		// upon selecting files for upload,
		// create their file attributes as scope variables
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			// add file to listing only if it is not already
			// in the listing, else we'd create
			// duplicates
			var fileIndex = scope.indexOfFileInListing(file.name);
			if(fileIndex == -1) {
				// if file NOT already in listing, do nothing here
				console.log(file.name + " not found in listing");
			} else {
				// if file already in listing, remove it before
				// re-adding it again
				console.log(file.name + " found in listing");
				scope.removeFileFromListing(fileIndex);
			}
			file.progressVisible = false;
			file.progress = 0;
			file.status = "not uploaded";
			// TODO: Workaround: create custom size property intead of
			// using existing ready-only size property
			file.sizeInBytes = file.size;
			scope.files.push(file);
		}
	}

    //============== FILE BROWSER =============
	var fileBrowser = document.getElementById("fileBrowser");
	scope.setFiles = function(element) {
		scope.$apply(function() {
			scope.addSelectedFilesToListing(element.files);
			// reset the files selection in the file browser
			fileBrowser.value = "";
		});
		// immediately start uploading files upon selecting them
		// in the file browser
		scope.uploadFiles();
	};

    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox");

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false);
    dropbox.addEventListener("dragleave", dragEnterLeave, false);

    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var clazz = 'not-available';
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
        scope.$apply(function(){
            scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
            scope.dropClass = ok ? 'over' : 'not-available';
        });
    }, false);

    dropbox.addEventListener("drop", function(event) {
        event.stopPropagation();
        event.preventDefault();

		// STEP 1: start with fresh file listing of already uploaded files
		scope.listUploadedFiles();

		// STEP 2: add to the fresh file listing of already uploaded files
		// a list of files that are upload in progress
        var files = event.dataTransfer.files;
        if (files.length > 0) {
            //scope.$apply(function(){
				scope.addSelectedFilesToListing(files);
            //});
        }

		// STEP 3: immediately start uploading files upon dropping them
		// into the dropbox
		scope.uploadFiles();

    }, false);
    //============== DRAG & DROP =============

    scope.uploadFiles = function() {
        for (var fileIndex in scope.files) {
        	var formData = new FormData();
            formData.append("uploadedFile", scope.files[fileIndex]);
	        var xhr = new XMLHttpRequest();
			xhr.fileIndex = fileIndex;//add custom param for file index
	        xhr.upload.addEventListener("progress", uploadProgress, false);
	        xhr.addEventListener("load", uploadComplete, false);
	        xhr.addEventListener("error", uploadFailed, false);
	        xhr.addEventListener("abort", uploadCanceled, false);
	        xhr.open("POST", "/apis/upload");
	        scope.files[fileIndex].progressVisible = true;
			scope.files[fileIndex].status = "uploading";
	        xhr.send(formData);
		}
    }

    function uploadProgress(event) {
        scope.$apply(function(){
            if (event.lengthComputable) {
                scope.progress = Math.round(event.loaded * 100 / event.total);
            } else {
                scope.progress = 'unable to compute';
            }
        });
    }

    function uploadComplete(event) {
		console.log("Uploaded completed for: " + scope.files[event.target.fileIndex].name);
	    scope.$apply(function(){
	        /* This event is raised when the server send back a response */
			scope.files[event.target.fileIndex].progressVisible = false;
			scope.files[event.target.fileIndex].status = "uploaded";//event.target.responseText;
		});
    }

    function uploadFailed(event) {
		var uploadFailedMsg = "Uploaded failed for: " + scope.files[event.target.fileIndex].name;
		alert(uploadFailedMsg);//TODO: replace alert with something less annoying
		console.log(uploadFailedMsg);
        scope.$apply(function(){
			scope.files[event.target.fileIndex].progressVisible = false;
			// don't display error for failed file upload, rather, must remove it
			// from the file listing
			scope.removeFileFromListing(event.target.fileIndex);
			//scope.files[event.target.fileIndex].status = event.target.responseText;
		});
    }

    function uploadCanceled(event) {
		var uploadCanceledMsg = "Uploaded canceled for: " + scope.files[event.target.fileIndex].name;
		alert(uploadCanceledMsg);//TODO: replace alert with something less annoying
		console.log(uploadCanceledMsg);
        scope.$apply(function(){
			scope.files[event.target.fileIndex].progressVisible = false;
        });
    }

    scope.deleteFile = function(filename) {
		// Use the users API which has been deployed
        // in the Amazon Cloud
        var deleteFileApi = "/apis/delete/" + filename;//this URL is relative to base URL
        var httpResponse = http.get(deleteFileApi);
        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(status) {
			// delete was successful, refresh the file listing
			if(status === "deleted") {
				scope.listUploadedFiles();
			} else {
				alert("Failed to delete " + filename);
			}
        });
	}

	scope.downloadFile = function(filename) {
		// Use the users API which has been deployed
        // in the Amazon Cloud
        var downloadFileApi = "/apis/download/" + filename;//this URL is relative to base URL
        var httpResponse = http.get(downloadFileApi, { "name": filename, "responseType":"arraybuffer"});
        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(data, status, headers) {
			headers = headers();
	        var filename = headers['x-filename'];
	        var contentType = headers['content-type'];

	        var linkElement = document.createElement('a');
	        try {
	            var blob = new Blob([data], { type: contentType });
	            var url = window.URL.createObjectURL(blob);

	            linkElement.setAttribute('href', url);
	            linkElement.setAttribute("download", filename);

	            var clickEvent = new MouseEvent("click", {
	                "view": window,
	                "bubbles": true,
	                "cancelable": false
	            });
	            linkElement.dispatchEvent(clickEvent);
	        } catch (ex) {
	            console.log(ex);
	        }
        });
	}

}
