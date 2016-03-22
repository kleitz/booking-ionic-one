(function(){
"use strict";

angular.module('app')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, PermissionStore, $ionicModal, $auth, $timeout,DataService){

    $rootScope.user = null;
    var vm = this;

     
    $rootScope.credentials = {
        email : '',
        password : ''
    };

    $rootScope.loginError = null;
    
    $rootScope.login = function(){
        $auth.login($scope.credentials)
        .then(function(response) {
            // Redirect user here after a successful log in.
            $rootScope.logged = true;
            $rootScope.$broadcast("app:loginSuccess", response);
            console.log("login success", response);
        })
        .catch(function(response) {
        // Handle errors here, such as displaying a notification
        // for invalid email and/or password.
            $rootScope.$broadcast("app:loginError", response);
            console.error("login error", response);
        });
    }

    $ionicModal.fromTemplateUrl('templates/modal_login.html',
        {
            scope : $scope
        }
    ).then(function(modal){
        vm.modal = modal;
    })

    // An example implementation of login/logout helpers
    // To use them, $auth must be injected into controller

    


    $rootScope.$on("app:loginSuccess", function(){
        DataService.me.get()
        .then(function(data){
            $rootScope.user = data;
        })
    });
    
    if($auth.isAuthenticated()){
        $timeout(function(){
            $rootScope.logged = true;
            $rootScope.$broadcast("app:loginSuccess");    
        })
        
    }

    $scope.logout = function(){
        $auth.logout()
        $rootScope.$broadcast("app:logoutSuccess");
        $rootScope.logged = false;
        $rootScope.user = null;
        PermissionStore.clearStore();
    };
    

    vm.modalLogin = function(callback){
        vm.modal.show();
    }

    $scope.$on('$destroy', function() {
        vm.modal.remove();
    });

};


})();