
angular.module('eventCtrl', ['eventService'])

    .controller('eventController', function(Event) {

        var vm = this;

         vm.processing = true;

        Event.all()
            .success(function (data) {

                vm.processing = false;

                vm.events = data;
            });

        vm.deleteEvent = function (id) {
            vm.processing = true;

            Event.delete(id)
                .success(function (data) {

                    Event.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.events = data;
                        });

                });
        };
    })

    .controller('eventCreateController', function($scope, $auth, Event) {

        var vm = this;
    
        var token = $auth.getPayload();
    
        vm.mail = token.mail;

        vm.type = 'create';

        // function to create an event
        vm.saveEvent = function() {
            console.log('hereasdf');
            console.log(vm.eventData.date);
            console.log(vm.eventData.datetime);
            vm.message = '';
            if (typeof vm.eventData.date == 'undefined'){
                vm.message = 'Please select a date on the calendar';
            }else{
                if (typeof vm.eventData.datetime == 'undefined'){
                    var d = new Date();
                    d.setHours( 0 );
                    d.setMinutes( 0 );
                    vm.eventData.datetime = d;
                }
                vm.processing = true;
//                vm.message = '';
                console.log(vm.eventData.date);
                console.log(vm.eventData.datetime);
                
                // use the create function in the userService
                Event.create(vm.eventData)
                    .success(function(data) {
                        vm.processing = false;
                        vm.eventData = {};
                        vm.message = data.message;
                    });
            }
        };

    })



    

    .controller('TimepickerDemoCtrl', function ($scope) {
    
      $scope.$watch('mytime', function(v){
          $scope.event.eventData.datetime = v;
        });
    
      $scope.mytime = new Date(2015,12,2,0,0,0,0);

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };
    
      $scope.clear = function () {
        $scope.mytime = null;
      };
       $scope.clear();

      $scope.update = function() {
        var d = new Date();
        d.setHours( 0 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };
    $scope.update();

    })




    .controller('DatepickerDemoCtrl', function ($scope) {
    
    $scope.$watch('dt', function(v){
      $scope.event.eventData.date = v;
    });
    
    $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();
    
    

  $scope.clear = function () {
    $scope.dt = null;
  };
    $scope.clear();

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
      },
      {
        date: afterTomorrow,
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
});



