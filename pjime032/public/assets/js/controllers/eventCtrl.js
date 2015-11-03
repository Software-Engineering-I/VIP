/**
 * Created by Emmanuel on 10/23/2015.
 */
angular.module('eventCtrl', ['eventService'])

    .controller('eventController', function(Event) {

        var vm = this;

        // set a processing variable to show loading things
        // vm.processing = true;

        // grab all the users at page load
        // "Event" refers to eventService factory object
        Event.all()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                //vm.processing = false;

                // bind the events that come back to vm.events
                vm.events = data;
            });

        // function to delete an event
        vm.deleteEvent = function(id) {
            vm.processing = true;

            Event.delete(id)
                .success(function(data) {

                    // get all users to update the table
                    // you can also set up your api
                    // to return the list of users with the delete call
                    Event.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.events = data;
                        });

                });
        };

    })

// controller applied to user creation page
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

// controller applied to user edit page
    .controller('eventEditController', function($routeParams, Event) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'edit';

        // get the user data for the user you want to edit
        // $routeParams is the way we grab data from the URL
        Event.get($routeParams.event_id)
            .success(function(data) {
                vm.userData = data;
            });

        // function to save the user
        vm.saveEvent = function() {
            vm.processing = true;
            vm.message = '';

            // call the userService function to update
            Event.update($routeParams.event_id, vm.eventData)
                .success(function(data) {
                    vm.processing = false;

                    // clear the form
                    vm.eventData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        };

    });