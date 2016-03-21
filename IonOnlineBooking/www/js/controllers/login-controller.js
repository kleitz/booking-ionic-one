(function(){
"use strict";

angular.module('app')
.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $rootScope){
    $scope.credentials = {
        username : '',
        password : ''
    };

    $scope.loginError = null;
    
    $scope.login = function(){
        /* fake login */
        $rootScope.user = {
            username : "mauro",
            email : "somemauro@somestrangeexample.com"
        };
        $rootScope.$broadcast("app:loginSuccess", {});
    }

};


})();