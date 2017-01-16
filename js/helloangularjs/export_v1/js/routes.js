angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('loginPage', {
    url: '/login',
    templateUrl: 'templates/loginPage.html',
    controller: 'loginPageCtrl'
  })

  .state('signUpPage', {
    url: '/signup',
    templateUrl: 'templates/signUpPage.html',
    controller: 'signUpPageCtrl'
  })

  .state('welcomePage', {
    url: '/welcome',
    templateUrl: 'templates/welcomePage.html',
    controller: 'welcomePageCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});