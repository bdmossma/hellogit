angular.module('app', [], function() {});
FileUploadController.$inject = ['$scope'];
function FileUploadController(scope) {
    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox");
    scope.dropText = 'Drop files here...';

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        scope.$apply(function(){
            scope.dropText = 'Drop files here...';
            scope.dropClass = '';
        });
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
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)));
        evt.stopPropagation();
        evt.preventDefault();
        scope.$apply(function(){
            scope.dropText = 'Drop files here...';
            scope.dropClass = '';
        });
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            scope.$apply(function(){
				// upon dropping files, create their file attributes as scope variables
                scope.files = [];
                for (var i = 0; i < files.length; i++) {
					var file = files[i];
					file.progressVisible = false;
					files.progress = 0;
					files.status = "pending";
                    scope.files.push(file);
                }
            })
        }
		//immediately start uploading files upon dropping them
		scope.uploadFiles();
    }, false);
    //============== DRAG & DROP =============

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
		scope.files[event.target.fileIndex].status = event.target.responseText;
	})
    }

    function uploadFailed(event) {
        scope.$apply(function(){
			scope.files[event.target.fileIndex].progressVisible = false;
			scope.files[event.target.fileIndex].status = event.target.responseText;
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
