// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module(
  'app', 
  [
    'ionic', 
    'app.constants',
    'app.networkconfig',
    'app.permissions',
    'app.statesconfig',
    'app.satellizerconfig',
    'http-auth-interceptor',
    'restangular',
    'ui.rCalendar',
  ]
)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  //hook provided by http-auth-interceptor
  /*
  $rootScope.$on('event:auth-loginRequired', function(event, data){
      //normally redirect to login or open a login popup
  });
  */

  // hooks provided by angular-permission
  // redirections can be handled directly in state definitions, via "redirectTo" parameter
  
  //$rootScope.$on('$stateChangePermissionStart', function(evt, toState, toParams){})
  //$rootScope.$on('$stateChangePermissionAccepted', function(evt, toState, toParams ){});
  //$rootScope.$on('$stateChangePermissionDenied', function(evt, toState, toParams){})




})

.config(function($stateProvider, $urlRouterProvider) {
  
});
