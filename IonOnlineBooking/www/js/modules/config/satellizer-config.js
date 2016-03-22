(function(){
"use strict";

angular.module('app.satellizerconfig', ['satellizer'])

.config(function ($authProvider, baseServerUrl) {
  /* configuring satellizer for working with django rest framework token auth */
  $authProvider.baseUrl = baseServerUrl;
  $authProvider.loginUrl = 'auth/';
  $authProvider.authToken = 'JWT';
});

})();