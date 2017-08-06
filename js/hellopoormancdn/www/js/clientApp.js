angular.module('app', [], function() {});
FileUploadController.$inject = ['$scope', '$http'];
function FileUploadController(scope, http) {

	// initialize file listing as empty array
    scope.files = [];

	scope.listUploadedFiles = function() {
		console.log("bp: listUploadedFiles");
	    //scope.$apply(function() {
			// Use the users API which has been deployed
	        // in the Amazon Cloud
	        var filesApi = "/apis/files/";//this URL is relative to base URL
	        var httpResponse = http.get(filesApi);

			console.log("bp: listUploadedFiles in $apply");
	        // $http parses json for us, so we can just use it without having to parse it out
	        httpResponse.success( function(files) {
					console.log("listing files in JSON array: ");
		            for(var fileIndex in files){
						console.log("name: " + files[fileIndex].name + ", size: " + files[fileIndex].size);
						var file = new File([""], files[fileIndex].name, {});
						file.size = files[fileIndex].size;
						file.progressVisible = false;
						files.progress = 0;
						files.status = "uploaded";
	                    scope.files.push(file);
		            }

					console.log("listing files in File API array: ");
					for(var fileIndex in scope.files){
						console.log("name: " + scope.files[fileIndex].name + ", size: " + scope.files[fileIndex].size);
					}
	        });
		//});
		console.log("bp: listUploadedFiles after $apply");
	}

	scope.listUploadedFiles();//get fresh listing of already uploaded files


    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox");
    scope.dropText = 'Drop files here...';

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        //scope.$apply(function(){
        //    scope.dropText = 'Drop files here...';
        //    scope.dropClass = '';
        //});
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
    dropbox.addEventListener("drop", function(evt) {
		console.log("bp: drop event listener");
        evt.stopPropagation();
        evt.preventDefault();
        //scope.$apply(function(){
        //    scope.dropText = 'Drop files here...';
        //    scope.dropClass = '';
        //});
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            scope.$apply(function(){
				console.log("bp: drop event listener in $apply");
				// upon dropping files, create their file attributes as scope variables
                for (var i = 0; i < files.length; i++) {
					var file = files[i];
					file.progressVisible = false;
					files.progress = 0;
					files.status = "not uploaded";
                    scope.files.push(file);
					//var testFile = { "name" : file.name, "size" : file.size, "progressVisible" : false, "progress" : 0, "status" : "uploaded"};
					//scope.files.push(testFile);
                }
            });
        }

		scope.listUploadedFiles();//refresh the listing of already uploaded files

		//immediately start uploading files upon dropping them
		scope.uploadFiles();
    }, false);
    //============== DRAG & DROP =============

	/*
    scope.setFiles = function(element) {
    scope.$apply(function(scope) {
			// Initialize file listing as an empty array of json objects
			scope.files = [];
			for (var i = 0; i < element.files.length; i++) {
				alert("bp: initializing files! index: " + i);
				var file = element.files[i];
				file.progressVisible = false;
				file.progress = 0;
				file.status = "";
				scope.files.push(file);
			}
			scope.progressVisible = false;
		});
    };
	*/

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
        })
    }

    function uploadComplete(event) {
        scope.$apply(function(){
        /* This event is raised when the server send back a response */
		scope.files[event.target.fileIndex].progressVisible = false;
		scope.files[event.target.fileIndex].status = "uploaded";//event.target.responseText;
	})
    }

    function uploadFailed(event) {
        scope.$apply(function(){
			scope.files[event.target.fileIndex].progressVisible = false;
			// don't display error for failed file upload, rather, must remove it
			// from the file listing
			var fileIndexToRemove = event.target.fileIndex;
			var numberOfFileIndicesToRemove = 1;//just remove one item from this position
			scope.files.splice(fileIndexToRemove, numberOfFileIndicesToRemove);
			//scope.files[event.target.fileIndex].status = event.target.responseText;
		});
    }

    function uploadCanceled(event) {
        scope.$apply(function(){
			scope.files[event.target.fileIndex].progressVisible = false;
        });
        alert("The upload has been canceled by the user or the browser dropped the connection.");
    }

    scope.deleteFile = function(filename) {
		alert("TODO: Delete file");
	}

	scope.downloadFile = function(filename) {
		alert("TODO: Download file");
	}

}
