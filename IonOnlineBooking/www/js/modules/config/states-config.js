(function(){

"use strict";

angular.module('app.statesconfig', ['ionic'])

.run(function($rootScope, $state, $ionicHistory){

    //perform redirects based on login/logout here
    
    $rootScope.$on("app:logoutSuccess", function(){
        $state.go("app.login");
    })

    /*
    $rootScope.$on("app:loginSuccess", function(){
        $ionicHistory.nextViewOptions({
            historyRoot : true
        })
        $state.go("app.account");
    })
    */

    $rootScope.$on('$stateChangePermissionDenied',
        function(event, toState, toParams, options) { 
            $state.go("app.login", { next : toState.name, nextParams:toParams })
        }
    );
    

})

.config(function($stateProvider, $urlRouterProvider){

    /* States config */
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller : 'HomeCtrl as HomeCtrl'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        cache : false,
        params : { next : null, nextParams : null },
        controller : 'LoginCtrl',

        onEnter : function($state, $stateParams, $rootScope, $ionicModal, $auth, $timeout){
            var modal;

            function redirect(){
                if(!$stateParams.next){
                    $state.go('app.home', {});
                    return;
                }
                $state.go($stateParams.next, $stateParams.nextParams )
            }

            var s = $rootScope.$on("app:loginSuccess", function(){
                if($rootScope.loginModal){
                    $rootScope.loginModal.hide();
                }
                s();
                redirect();
            });
            
            $timeout(function(){
                $ionicModal.fromTemplateUrl('templates/modal_login.html', {
                    backdropClickToClose: false, hardwareBackButtonClose:false,
                    scope:$rootScope })
                .then(function(modal){
                    $rootScope.loginModal = modal;
                    if($rootScope.logged){
                       redirect();
                       return;
                    }
                    modal.show();
                    
                })
            }, 200)
            
             
        },
        onExit : function($state, $rootScope){
            if($rootScope.loginModal){
                $rootScope.loginModal.remove();    
            }
            

        }
    })

    .state('app.shop', {
        url: '/shop/:shopId',
        views: {
            'menuContent': {
                templateUrl: 'templates/shop.html',
                controller : 'ShopCtrl as ShopCtrl'
            }
        }
    })

    .state('app.service', {
        url: '/shop-service/:shopId/service/:serviceId?startDate&endDate',
        views: {
            'menuContent': {
                templateUrl: 'templates/service.html',
                controller : 'ServiceCtrl as ServiceCtrl'
            }
        }
    })

    .state('app.service-day', {
        url: '/shop-service-day/:shopId/service/:serviceId/:selectedDate',
        views: {
            'menuContent': {
                templateUrl: 'templates/service_day.html',
                controller : 'ServiceCtrl as ServiceCtrl'
            }
        }
    })

    .state('app.service-book', {
        url: '/shop-service-book/:shopId/service/:serviceId/:start/:end',
        views: {
            'menuContent': {
                templateUrl: 'templates/service_book.html',
                controller : 'ServiceBookCtrl as ServiceBookCtrl'
            }
        },
        data: {
            permissions: {
                only: ['logged'],
                //redirectTo : 'app.login'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.bookings', {
        url: '/bookings',
        views: {
            'menuContent': {
                templateUrl: 'templates/bookings.html',
                controller : 'BookingsCtrl as BookingsCtrl'
            }
        },
        data: {
            permissions: {
                only: ['logged']
            }
        },

    })
    
    .state('app.account', {
        url: '/account',
        views: {
            'menuContent': {
                templateUrl: 'templates/account.html'
            }
        },
        data: {
            permissions: {
                only: ['logged']
            }
        },

    })

     

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('app.home');
    });

})

})();