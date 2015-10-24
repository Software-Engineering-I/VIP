angular.module('userCtrl', ['userService'])

    .controller('userController', function(User) {

        var vm = this;

        // set a processing variable to show loading things
       // vm.processing = true;

        // grab all the users at page load
        // "User" refers to userService factory object
        User.all()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                //vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data;
            });

        // function to delete a user
        vm.deleteUser = function(id) {
            vm.processing = true;

            User.delete(id)
                .success(function(data) {

                    // get all users to update the table
                    // you can also set up your api
                    // to return the list of users with the delete call
                    User.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.users = data;
                        });

                });
        };

    })

// controller applied to user creation page
    .controller('userCreateController', function(User) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'create';

        // function to create a user
        vm.saveUser = function() {
            vm.processing = true;
            vm.message = '';

            //Calls validRegistration function to make sure the information is good!
            if(!validRegistration(vm.userData)){
                return;
            }


            // use the create function in the userService
            User.create(vm.userData)
                .success(function(data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });

        };

    })

// controller applied to user edit page
    .controller('userEditController', function($routeParams, User) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'edit';

        // get the user data for the user you want to edit
        // $routeParams is the way we grab data from the URL
        User.get($routeParams.user_id)
            .success(function(data) {
                vm.userData = data;
            });

        // function to save the user
        vm.saveUser = function() {
            vm.processing = true;
            vm.message = '';

            // call the userService function to update
            User.update($routeParams.user_id, vm.userData)
                .success(function(data) {
                    vm.processing = false;

                    // clear the form
                    vm.userData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        };

    });

//Andrew Mitchell
//Registration Validation Functions

function email_validation(uemail) {
    if(uemail == undefined)
    {
        alert("Email should not be empty.")
        return false;
    }
    var uemail_len = uemail.length;
    if (uemail_len == 0) {
        alert("Email should not be empty.");
        return false;
    }
    var uemail_source = uemail.substring(uemail_len - 7, uemail_len);
    if (uemail_source.toLowerCase() != "fiu.edu") {
        alert("Email should be an fiu.edu account")
        return false;
    }

    /* Need a check if the email is in the DB once we learn to connect*/
    return true;
}

function first_validation(first) {
    if(first == undefined)
    {
        alert("First name should not be empty.")
        return false;
    }
    var letters = /^[A-Za-z]+$/;
    if (first.match(letters)) {
        return true;
    } else {
        alert('First name must have alphabet characters only')
        return false;
    }
}

function middle_validation(middle) {

    if(middle == undefined)
    {
        alert("Middle name should not be empty.")
        return false;
    }
    var middle_len = middle.length;
    if (middle_len == 0) {
        alert("Middle name should not be empty.");
        return false;
    }
    var letters = /^[A-Za-z]+$/;
    if (middle.match(letters)) {
        return true;
    } else {
        alert('Middle name must have alphabet characters only');
        return false;
    }
    return true;
}

function last_validation(last) {
    if(last == undefined)
    {
        alert("Last name should not be empty.")
        return false;
    }
    var last_len = last.length;
    if (last_len == 0) {
        alert("Last Name should not be empty.");
        return false;
    }
    var letters = /^[A-Za-z]+$/;
    if (last.match(letters)) {
        return true;
    } else {
        alert('Last name must have alphabet characters only');
        return false;
    }
    return true;
}

function pid_validation(pid) {
    if(pid == undefined)
    {
        alert("Panther ID should not be empty.")
        return false;
    }
    var pid_len = pid.length;
    if (pid_len != 7) {
        alert("Please enter your 7 digit Panther-ID.");
        return false;
    }
    return true;
}

function pass_validation(pass, passconf) {
    if(pass == undefined || passconf == undefined)
    {
        alert("Please fill in both password fields.")
        return false;
    }
    var pass_len = pass.length;
    if (pass_len == 0) {
        alert("Please fill in the Password field.");
        return false;
    }
    if (pass != passconf) {
        alert("Your two passwords do not match.")
        return false;
    }

    return true;
}

function cell_validation(cell) {
    if(cell == undefined)
    {
        alert("Cell should not be empty.")
        return false;
    }
    var numbers = /[0-9]/;
    if (cell.match(numbers)) {} else {
        alert('Cell Phone must have numeric characters only');
        return false;
    }
    var cell_len = cell.length;
    if (cell_len != 10 && cell_len != 12) {
        alert("Please enter a 10 digit number for your cell phone (no dashes).");
        return false;
    }
    return true;
}

function rank_validation(rank) {
    if(rank == undefined)
    {
        alert("Rank should not be empty.")
        return false;
    }
    if (rank == "Default") {
        alert("Rank is a required field.")
        return false;
    }

    return true;
}

function college_validation(college) {
    if(college == undefined)
    {
        alert("College should not be empty.")
        return false;
    }
    if (college == "Default") {
        alert("College is a required field.")
        return false;
    }

    return true;
}

function major_validation(major) {
    if(major == undefined)
    {
        alert("Major should not be empty.")
        return false;
    }
    if (major == "Default") {
        alert("Major is a required field.")
        return false;
    }

    return true;
}

function ethnicity_validation(ethnicity) {
    if(ethnicity == undefined)
    {
        alert("Ethnicity should not be empty.")
        return false;
    }
    if (ethnicity == "Default") {
        alert("Ethnicity is a required field.")
        return false;
    }

    return true;
}

function visa_validation(visa) {
    if(visa == undefined)
    {
        alert("Visa status should not be empty.")
        return false;
    }
    if (visa == "Default") {
        alert("Visa Status is a required field.")
        return false;
    }

    return true;
}

function sex_validation(sex) {
    if(sex == undefined)
    {
        alert("Sex should not be empty.")
        return false;
    }
    if (sex != "male" && sex != "female") {
        alert("Please select a Gender.")
        return false;
    }

    return true;
}

function validRegistration(userData) {
    var first = userData.f_name;
    var middle = userData.m_name;
    var last = userData.l_name;
    var pid = userData.pID;
    var email = userData.email;
    var pass = userData.password;
    var passconf = userData.passconf;
    var cell = userData.cell;
    var rank = userData.Rank;
    var college = userData.College;
    var major = userData.Major;
    var ethnicity = userData.Ethnicity;
    var sex = userData.Sex;
    var visa = userData.visaStatus;


    if (first_validation(first)) {
        if (middle_validation(middle)) {
            if (last_validation(last)) {
                if (pid_validation(pid)) {
                    if (email_validation(email)) {
                        if (pass_validation(pass, passconf)) {
                            if (cell_validation(cell)) {
                                if (rank_validation(rank)) {
                                    if (college_validation(college)) {
                                        if (major_validation(major)) {
                                            if (ethnicity_validation(ethnicity)) {
                                                if (sex_validation(sex)) {
                                                    if (visa_validation(visa)) {
                                                        alert("Thank you for registering. You are now in the database!");
                                                        return true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}