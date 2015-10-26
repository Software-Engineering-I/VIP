angular.module('reportControl', ['reportService'])

// controller applied to user creation page
    .controller('reportController', function(Report) {

        var vm = this;
        vm.title = "6 month report";

        // function to create a user
        vm.saveReport = function() {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            Report.create(vm.formData)
                .success(function(data) {
                    vm.processing = false;
                    vm.formData = {};
                    vm.message = data.message;
                });

        };
    });