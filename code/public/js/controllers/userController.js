angular.module('userControl', ['userService'])


.controller('userController', function(User) {

        var vm = this;

       // set a processing variable to show loading things
       vm.processing = true;

        // grab all the users at page load
        // "User" refers to userService factory object
        User.all()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data;
            });


           vm.updateProject = function(id,project) {
            console.log("being executed here")
            // call change project from User Service and give it id and optionally a project
            User.changeProject(id,project)

                // if the function succeeds repopulate table with new changes
                .success(function (data){

                    // call function to repopulate table
                    User.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.users = data;
                        });
                })
        };

  });