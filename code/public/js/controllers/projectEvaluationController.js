angular.module('projectEvaluationControl', ['projectEvaluationService'])

// controller applied to user creation page
    .controller('projectEvaluationController', function(Evaluation) {

        var vm = this;
        vm.title = "Project Evaluation";

        // function to create a user
        vm.saveEvaluation = function() {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            Evaluation.create(vm.feedback)
                .success(function(data) {
                    vm.processing = false;
                    vm.feedback = {};
                    vm.message = data.message;
                });
        };
    });