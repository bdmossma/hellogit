angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('grumpy', {
    url: '/grumpy',
    templateUrl: 'templates/grumpy.html',
    controller: 'grumpyCtrl'
  })

  .state('sleepy', {
    url: '/sleepy',
    templateUrl: 'templates/sleepy.html',
    controller: 'sleepyCtrl'
  })

  .state('happy', {
    url: '/happy',
    templateUrl: 'templates/happy.html',
    controller: 'happyCtrl'
  })

$urlRouterProvider.otherwise('/home')

  

});