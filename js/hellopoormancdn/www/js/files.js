
var app = angular.module('myApp', []);
app.controller('myController', function($scope, $http) {
    $scope.files = ["No files"];

	$scope.listFiles = function() {

        $scope.files = [];//reset before adding files again

        // Use the users API which has been deployed
        // in the Amazon Cloud
        var filesApi = "http://localhost:8080/apis/files/";//"https://cdn.gorealcloud.com/apis/files/";
        var httpResponse = $http.get(filesApi);

        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(files) {
            //alert(files)
            for(var fileIndex in files){
                $scope.files.push(files[fileIndex]);//print each filename in each menu item
            }
        });

        httpResponse.error( function(jsonResponse) {
            // if downloading users suffers HTTP level error, display lost
            // connectivity error message
            alert("Lost connection to server.");
        });
    };

	$scope.deleteFile = function(file) {
        var deleteFileApi = "http://localhost:8080/apis/delete/" + file;
        var httpResponse = $http.get(deleteFileApi);
        $scope.listFiles();
	};
	
	$scope.listFiles();

});
