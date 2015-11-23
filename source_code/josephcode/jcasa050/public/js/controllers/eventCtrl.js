
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

    });