(function(){

"use strict";

angular.module('app.statesconfig', ['ionic'])

.run(function($rootScope, $state, $ionicHistory){

    //perform redirects based on login/logout here
    
    $rootScope.$on("app:logoutSuccess", function(){
        $state.go("app.login");
    })

    $rootScope.$on("app:loginSuccess", function(){
        $ionicHistory.nextViewOptions({
            historyRoot : true
        })
        $state.go("app.account");
    })
    

})

.config(function($stateProvider, $urlRouterProvider){

    /* States config */
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
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
        url: '/shop-service/:shopId/service/:serviceId',
        views: {
            'menuContent': {
                templateUrl: 'templates/service.html',
                controller : 'ServiceCtrl as ServiceCtrl'
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
    
    .state('app.account', {
        url: '/account',
        views: {
            'menuContent': {
                templateUrl: 'templates/account.html'
            }
        },
        data: {
            permissions: {
                only: ['logged'],
                redirectTo : 'app.login'
            }
        },

    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        },

    })

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('app.home');
    });

})

})();