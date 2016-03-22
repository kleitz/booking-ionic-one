(function(){
"use strict";

angular.module('app')
.controller('ServiceBookCtrl', ServiceBookCtrl);

function ServiceBookCtrl($scope, $rootScope, DataService, $stateParams, $state, $ionicLoading, $ionicHistory){

    var vm = this;
    this.start_formatted = moment($stateParams.start).format();
    this.end_formatted = moment($stateParams.end).format();
    this.day = moment($stateParams.start).format('YYYY-MM-DD');
    this.booked = false;
    this.bookingError = null;

    DataService.shops
    .one($stateParams.shopId)
    .get()
    .then(function(shop){
        vm.shop = shop;
    });

    DataService.shops
    .one($stateParams.shopId)
    .oneUrl('services')
    .one($stateParams.serviceId)
    .get()
    .then(function(service){
        vm.service = service;
        
    });


    this.toDaySelection = function(){
        $state.go('app.service-day', { shopId : $stateParams.shopId, serviceId : $stateParams.serviceId, selectedDate:vm.day })

    }

    this.bookCurrent = function(){
        $ionicLoading.show();
        DataService.bookService.post({
            start : $stateParams.start,
            end : $stateParams.end,
            service: $stateParams.serviceId
        })
        .then(function(data){
            console.log(data)
            vm.booked = true;
            $ionicHistory.nextViewOptions({
                historyRoot : true
            })
            $ionicLoading.hide();
            
        })
        .catch(function(err){
            console.log(err)
            vm.bookingError = err;
            $ionicLoading.hide();
        })
        
    }


    
    

};


})();