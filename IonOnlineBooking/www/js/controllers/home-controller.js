(function(){
"use strict";

angular.module('app')
.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $rootScope, DataService){

    var vm = this;
    DataService.shops
    .getList()
    .then(function(shops){
        vm.shops = shops;
    })

};


})();