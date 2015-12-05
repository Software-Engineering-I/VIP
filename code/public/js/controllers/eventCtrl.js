
angular.module('eventCtrl', ['eventService', 'mailService', 'subscriptionService'])

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

    .controller('eventCreateController', function($scope, $auth, Event, Mail, Subscriptions) {

        var vm = this;
    
        var token = $auth.getPayload();
    
        vm.mail = token.mail;

        vm.type = 'create';

        // function to create an event
        vm.saveEvent = function() {
            vm.message = '';
            if (typeof vm.eventData.date == 'undefined'){
                vm.message = 'Please select a date on the calendar';
            }else{
                if (typeof vm.eventData.datetime == 'undefined'){
                    var d = new Date();
                    d.setHours( 0 );
                    d.setMinutes( 0 );
                    d.setSeconds(0);
                    vm.eventData.datetime = d;
                }
                vm.processing = true;
                console.log(vm.eventData.date);
                console.log(vm.eventData.datetime);
                
                Event.create(vm.eventData)
                    .success(function(data) {
                        vm.processing = false;
                        vm.message = data.message;
                        vm.emailData = {};
                    
                        //get the subscriberslist from the subscriptionService
                        Subscriptions.all()
                            .success(function (data) {
                                var list = [];
                            
                                for(i=0; i<data.length; i++){
                                    list[i] = data[i].email;
                                }
                                console.log(list);
                            
                                vm.emailData.sender = 'Masoud Sadjadi <vipadmin@fiu.edu>';
                                vm.emailData.recipient = list;
                                vm.emailData.subject = "New Event: " + vm.eventData.name;
                                vm.emailData.message = vm.eventData.message + "\n" + vm.eventData.date.toDateString() + " " + vm.eventData.datetime.toLocaleTimeString() + "\n" + "Events: http://vip-dev.cis.fiu.edu/events";
                                Mail.sendEmail(vm.emailData)
                                    .success(function(data) {
                                        console.log("Successful send!");
                                    })
                            
                            });
                    
                    });
            }
        };

    })



    

    .controller('TimepickerDemoCtrl', function ($scope) {
    
    
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
        d.setSeconds(0);
        $scope.mytime = d;
      };
    $scope.update();

    })




    .controller('DatepickerDemoCtrl', function ($scope) {
    
    
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



