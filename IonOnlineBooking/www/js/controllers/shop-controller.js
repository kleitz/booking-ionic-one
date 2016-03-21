(function(){
"use strict";

angular.module('app')
.controller('ShopCtrl', ShopCtrl);

function ShopCtrl($scope, $rootScope, DataService, $stateParams){

    var vm = this;
    DataService.shops
    .one($stateParams.shopId)
    .get()
    .then(function(shop){
        vm.shop = shop;
    });

    DataService.shops
    .one($stateParams.shopId)
    .oneUrl('services')
    .getList()
    .then(function(services){
        vm.services = services;
    });

};


})();