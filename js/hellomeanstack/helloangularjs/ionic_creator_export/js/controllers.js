angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http) {
        
    // DATA: Define Email and Password to be entered by the user.
    // How? The AngularJS "ng-model" directive is added to HTML for these form inputs
    // as a custom attribute so we can share them between the view and the model and the controller
    // can act on anything in the model. (This is typical MVC -
    // Model View Controller)
    $scope.loginData = { email: "", password: "" };
    
    $scope.loginError = { hide: true, message: "" };
    
    // ACTIONS: Define a function to be invoked as the action for the Login button press.
    // How? The AngularJS "ng-click" directive is added to HTML for the Login button
    // as a custom attribute so we can translate user action on the view
    // to the corresponding controller for that view.
    $scope.login = function() {
        
        // TODO: Do robust error checking on email and password
        // input by the user.
        var inputError = "";
        if( !$scope.loginData.email ) {
            inputError += "Empty email." + "\n";
        }
        else if( $scope.loginData.email.indexOf('@') == -1 ) {
            inputError += "Invalid email.";
        }
        if( !$scope.loginData.password ) {
            inputError += "Empty password." + "\n";
        }
        if(inputError) {
            alert(inputError);
            return;
        }
        
        // Use the login API which has been deployed
        // in the Google Cloud
        var loginApi = "https://astral-sorter-155816.appspot-preview.com/apis/login/" + $scope.loginData.email + "/" + $scope.loginData.password;
        var httpResponse = $http.get(loginApi);
            
        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(response) {
            if( response.message == "loginResp" && response.result === true ) {
                // if login succeeds, go to Welcome Page
                $state.go("welcome");
                // after logging in, always reset the
                // fields in the login form
                $scope.loginData.email = "";
                $scope.loginData.password = "";   
            }
            else if("error" in response) {
                // if login suffers API level error, display whatever
                // error message was put into the JSON response
                // by the API
                alert(response.error);
            }
            else {
                alert("unknown response from api: " + JSON.stringify(response));
            }
        });
        
        httpResponse.error( function(response) {
            // if login suffers HTTP level error, display lost
            // connectivity error message
            alert("Lost connection to server.");
        });
    }
}])
   
.controller('signUpCtrl', ['$scope', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http) {

    $scope.signupData = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    
    $scope.signup = function() {

        // TODO: Do robust error checking on email and password
        // input by the user.
        var inputError = "";
        if( !$scope.signupData.firstName || !$scope.signupData.lastName ) {
            inputError += "Empty name." + "\n";
        }
        if( !$scope.signupData.phone ) {
            inputError += "Empty phone." + "\n";
        }
        if( !$scope.signupData.email ) {
            inputError += "Empty email." + "\n";
        }
        else if( $scope.signupData.email.indexOf('@') == -1 ) {
            inputError += "Invalid email." + "\n";
        }
        if( !$scope.signupData.password || !$scope.signupData.confirmPassword ) {
            inputError += "Empty password." + "\n";
        }
        else if( $scope.signupData.password != $scope.signupData.confirmPassword ) {
            inputError += "Password and Confirm Password do not match.";
        }
        
        if(inputError) {
            alert(inputError);
            return;
        }

        // Use the signUp API which has been deployed
        // in the Google Cloud
        var signupApi = "https://astral-sorter-155816.appspot-preview.com/apis/signup/" +
            $scope.signupData.firstName + "/" +
            $scope.signupData.lastName + "/" +
            $scope.signupData.phone + "/" +
            $scope.signupData.email + "/" +
            $scope.signupData.password;
        var httpResponse = $http.get(signupApi);
        
        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(response) {
            if(response.message == "signUpResp" && response.result === true) {
                // if signup succeeds, go to Welcome Page
                $state.go("welcome");
                
                // after signing up, always reset the
                // fields in the signup form
                $scope.signupData.firstName = "";
                $scope.signupData.lastName = "";
                $scope.signupData.phone = "";
                $scope.signupData.email = "";
                $scope.signupData.password = "";
                $scope.signupData.confirmPassword = "";
            }
            else if("error" in response) {
                // if signUp suffers API level error, display whatever
                // error message was put into the JSON response
                // by the API
                alert(response.error);
            }
            else {
                alert("unknown response from api: " + JSON.stringify(response));
            }
        });
        
        httpResponse.error( function(response) {
            // if signUp suffers HTTP level error, display lost
            // connectivity error message
            alert("Lost connection to server.");
        });
        
    }
    

}])
   
.controller('welcomeCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {
    $scope.goToHome = function() {
        $state.go("home");
    }
}])
   
.controller('homeCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {
    
    $scope.hideMenu = true;
    
    $scope.goToMenu = function() {
        $scope.hideMenu = !$scope.hideMenu;
        //$state.go("menu");
    }
}])
   
.controller('aboutCtrl', ['$scope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state) {
    $scope.goToHome = function() {
        $state.go("home");
    }
}])
   
.controller('usersCtrl', ['$scope', '$state', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http) {
    
    $scope.goToHome = function() {
        $state.go("home");
    };
    
    $scope.users = [];// empty array of empty json objects, we'll populate it later
    
    $scope.downloadUsers = function() {
        $scope.users = [];//reset before adding users again
        
        // Use the users API which has been deployed
        // in the Google Cloud
        var usersApi = "https://astral-sorter-155816.appspot-preview.com/apis/users";
        var httpResponse = $http.get(usersApi);
            
        // $http parses json for us, so we can just use it without having to parse it out
        httpResponse.success( function(response) {
            var message = response.message;
            var users = response.result;//result holds an array of users
            
            if( message == "usersResp" && users.length !== 0) {
                for(var index in users){
                    $scope.users.push(users[index].email);
                }
            }
            else if("error" in response) {
                // if downloading users suffers API level error, display whatever
                // error message was put into the JSON response
                // by the API
                alert(response.error);
            }
            else {
                alert("unknown response from api: " + JSON.stringify(response));
            }
        });
        
        httpResponse.error( function(response) {
            // if downloading users suffers HTTP level error, display lost
            // connectivity error message
            alert("Lost connection to server.");
        });
    };
}])
 