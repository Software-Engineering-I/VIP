angular.module('reportControl', ['reportService'])

// controller applied to user creation page
.controller('reportController', function(Report) {

    var vm = this;
    vm.title = "6 month report";
    vm.formData = {};

        // function to create a user
        vm.saveReport = function() {
            if( !vm.formData.question1 || 
                !vm.formData.question2 || 
                !vm.formData.question3 || 
                !vm.formData.question4 || 
                !vm.formData.question5 || 
                !vm.formData.question6 || 
                !vm.formData.question7 || 
                !vm.formData.question8 || 
                !vm.formData.question9 || 
                !vm.formData.question10 || 
                !vm.formData.question11) {
                alert('Please fill in all the fields');
        } else {
            vm.processing = true;
            vm.message = '';

            // use the create function in the userService
            Report.create(vm.formData)
            .success(function(data) {
                vm.processing = false;
                vm.formData = {};
                vm.message = data.message;
            });
        }
    };
});