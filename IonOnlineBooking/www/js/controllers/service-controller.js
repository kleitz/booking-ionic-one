(function(){
"use strict";

angular.module('app')
.controller('ServiceCtrl', ServiceCtrl);

function ServiceCtrl($scope, $rootScope, DataService, $stateParams, $state){

    var vm = this;
    vm.startDate = $stateParams.startDate ? moment(new Date($stateParams.currendDate)) : moment()
    vm.startDate = vm.startDate.subtract(vm.startDate.date(), 'days')
    vm.ranges = [];
    vm.currentCalendarDate = null;

    function updateStartEndOfMonth (dt){
        var x = moment(dt);
        
        vm.startOfMonth = x.subtract(x.date()+10, 'days').format('YYYY-MM-DD') 
        vm.endOfMonth = moment(vm.startOfMonth).add(45, 'days').format('YYYY-MM-DD') 
    }

    if($stateParams.selectedDate){
        vm.currentDay = $stateParams.selectedDate;
        updateStartEndOfMonth(vm.currentDay)
        updateRanges($stateParams.serviceId, 
            $stateParams.selectedDate, 
            moment($stateParams.selectedDate).add(1, 'days').format('YYYY-MM-DD') 
        );
        
        
    } else {
        updateStartEndOfMonth(new Date())
    }

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
        if(!$stateParams.selectedDate){
            updateRanges( 
                vm.service.id,
                vm.startOfMonth, 
                vm.endOfMonth
            )
        }
    });


    $scope.onTimeSelected = function (selectedTime) {
        console.log(selectedTime)
        var t = moment(selectedTime).format('YYYY-MM-DD');;
        if(vm.rangesByDates[t]){
            //vm.currentDay = t;    
            $state.go('app.service-day', {
                serviceId : vm.service.id,
                shopId : vm.shop.id,
                selectedDate  : t
            })
        }
        
    };


    function updateRanges (serviceId, startDate, endDate){
        DataService.getBookingRanges(
            serviceId,
            startDate, endDate)

        .then(function(ranges){
            console.log(1, ranges)
            var dates = ranges.map(range => {
                return moment(range.start).format('YYYY-MM-DD');
            })
            var byDates = _.groupBy(
                _.map(ranges, function(r){
                    r.start_moment = moment(r.start);
                    r.end_moment = moment(r.end)
                    return r
                }),
                function(range){
                return  moment(range.start).format('YYYY-MM-DD');
            });
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
            vm.ranges = calRanges;
            vm.rangesByDates = byDates;
            $scope.$broadcast('eventSourceChanged',vm.ranges);
            console.log(vm)
        })
    }

    this.onCalendarTitleChanged = function(title) {
        vm.currentCalendarTitle = title;
    }

    this.nextMonth = function(){
        vm.currentCalendarDate = moment(vm.currentCalendarDate).add(1, 'months').toDate()
        updateStartEndOfMonth(vm.currentCalendarDate);
        updateRanges( 
                vm.service.id,
                vm.startOfMonth, 
                vm.endOfMonth
            )
        //$scope.$broadcast('changeDate', 1);
    }

    this.prevMonth = function(){
        vm.currentCalendarDate = moment(vm.currentCalendarDate).add(-1, 'months').toDate()
        updateStartEndOfMonth(vm.currentCalendarDate)
        updateRanges( 
                vm.service.id,
                vm.startOfMonth, 
                vm.endOfMonth
            )
        //$scope.$broadcast('changeDate', -1);

    }

    this.goToMonthView = function(){
        $state.go('app.service', {
            serviceId : vm.service.id,
            shopId : vm.shop.id,
            startDate : vm.startOfMonth,
            endDate : vm.endOfMonth
        });
    }
    

};


})();