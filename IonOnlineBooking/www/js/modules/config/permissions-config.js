(function(){
"use strict";

angular.module('app.permissions', ['permission'])

.run(function (PermissionStore, $rootScope) {
  
  // Example: Define anonymous role based on $rootScope "user" property
  PermissionStore.definePermission('logged', function () {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if (!$rootScope.logged) {
      return false; // Is anonymous
    }
    return true;
  });

  // Example: "logged" role based on satellizer API.
  // To use it inject $auth into run function
  /*
  
  Permission.defineRole('logged', function () {
    $auth.isAuthenticated()
  });
  
  */

});

})();