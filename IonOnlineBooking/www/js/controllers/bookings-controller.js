(function(){
"use strict";

angular.module('app')
.controller('BookingsCtrl', BookingsCtrl);

function BookingsCtrl($scope, $rootScope, DataService, $stateParams, $state){

    var vm = this;
    this.bookings = [];

    DataService.userBookings
    .getList()
    .then(function(bookings){
        vm.bookings = bookings;
    });

    
    

};


})();