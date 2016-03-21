(function(){
"use strict";

angular.module('app')
.controller('ServiceCtrl', ServiceCtrl);

function ServiceCtrl($scope, $rootScope, DataService, $stateParams){

    var vm = this;
    vm.startDate = moment()
    vm.endDate = moment().add(1, 'months');
    vm.ranges = [];

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
        vm.updateRanges();
    });


    $scope.onTimeSelected = function (selectedTime) {
        console.log(selectedTime)
        vm.currentDay = moment(selectedTime).format('YYYY-MM-DD');;
    };


    this.updateRanges = function(){
        DataService.getBookingRanges(
            vm.service.id, 
            vm.startDate.toISOString(), 
            vm.endDate.toISOString())

        .then(function(ranges){
            
            var dates = ranges.map(range => {
                return moment(range.start).format('YYYY-MM-DD');
            })
            var byDates = _.groupBy(ranges, function(range){
                return  moment(range.start).format('YYYY-MM-DD');
            });

            console.error("dates", dates)
            var calRanges = _.map(_.uniq(dates), item => {
                var m = moment(item, 'YYYY-MM-DD');
                console.log("x", m.toDate())
                return {
                    title : "aaa",
                    startTime : m.utc().toDate(),
                    endTime : m.add(1, 'days').utc().toDate(),
                    allDay : true
                }
            })
            console.error("ranges", calRanges);
            vm.ranges = calRanges;
            vm.rangesByDates = byDates;
            $scope.$broadcast('eventSourceChanged',vm.ranges);
        })
    }



    

    this.onCalendarTitleChanged = function(title) {
        console.log(1, title)
        vm.currentCalendarTitle = title;
    }

    this.nextMonth = function(){
        $scope.$broadcast('changeDate', 1);
    }

    this.prevMonth = function(){
        $scope.$broadcast('changeDate', 1);
    }
    

};


})();