angular.module('projectEvaluationControl', ['projectEvaluationService', 'userService'])

    // controller applied to user creation page
    .controller('projectEvaluationController', function(Evaluations, User) {

        var vm = this;
        vm.title = "Project Evaluation";

        // grab all the users at page load
        // "User" refers to userService factory object
        User.all()
            .success(function(data) {
                // when all the users come back, remove the processing variable
                vm.processing = false;
                // bind the users that come back to vm.users
                vm.users = data;
            });

        // function to create a user
        vm.saveEvaluation = function() {
            vm.processing = true;
            vm.message = '';

            // use the create function
            Evaluations.create(vm.feedback)
                .success(function(data) {
                    vm.processing = false;
                    vm.feedback = {};
                    vm.message = data.message;
                });
        };


    });
