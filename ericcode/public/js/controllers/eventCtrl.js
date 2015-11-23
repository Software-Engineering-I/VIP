
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

    .controller('eventCreateController', function(Event) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'create';

        // function to create a user
        vm.saveEvent = function() {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            Event.create(vm.eventData)
                .success(function(data) {
                    vm.processing = false;
                    vm.eventData = {};
                    vm.message = data.message;
                });

        };

    })



    




    .controller('DatepickerDemoCtrl', function ($scope) {
    
    $scope.$watch('dt', function(v){
      $scope.event.eventData.date = v;
    });
    
//    $scope.$watch('event.eventData.date', function(v){
//      $scope.dt = v;
//    });
    
//    $scope.update(){
//        $scope.event.eventData.date = $scope.dt;
//    }
    
    $scope.today = function() {
    $scope.dt = new Date();
//    $scope.update();
//    $scope.event.eventData.date = new Date();
  };
  $scope.today();
    
    

  $scope.clear = function () {
    $scope.dt = null;
  };
//    $scope.clear();

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
//  $scope.maxDate = new Date(2020, 5, 22);

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
//        status: 'full'
      },
      {
        date: afterTomorrow,
//        status: 'partially'
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



