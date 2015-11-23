/**
 * Created by Emmanuel on 10/23/2015.
 */
angular.module('userCtrl', ['userService'])

    .controller('userController', function( User) {

        var vm = this;

        // set a processing variable to show loading things
         vm.processing = true;

        // grab all the users at page load
        // "User" refers to userService factory object
        User.all()
            .success(function (data) {

                 //when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data;
            });

        // function to delete a user
        vm.deleteUser = function (id) {
            vm.processing = true;

            User.delete(id)
                .success(function (data) {

                    // get all users to update the table
                    // you can also set up your api
                    // to return the list of users with the delete call
                    User.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.users = data;
                        });

                });
        };
        vm.updateProject = function(id,project) {

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

        //// function to check if student has been approve to project by PI/Staff
        //vm.checkApprovalStatus = function(id){
        //
        //    User.checkStatus(id);
        //
        //
        //};
    })
    //Controller for testing userType get
    .controller('userTypeController', function(email,User){


        var vm = this;
        vm.type = 'typetest';
        vm.userType = function(){
            vm.processing = true;
            vm.message = '';
            User.getUserType("amitc029@fiu.edu")
                .success(function(data){
                    vm.message = data.message;
                    alert(vm.message)
                });
        }

    })

    //Controller applied to verification user page

    .controller('verificationController', function($stateParams, User) {



            var vm = this;
            vm.type = 'verify';

            vm.verifyEmail = function() {
                vm.processing = true;
                vm.message = '';

                //alert($stateParams.user_id)

                User.get($stateParams.user_id)
                    .success(function(data) {
                        vm.userData = data;


                        //alert(vm.userData.email)

                        /*We should boot the user if they are not a PI and the userType is 'PendingFaculty' or 'PendingPI'

                         if(USERLOGINTYPE != PI && (vm.userData.userType == 'PendingFacultyForPI' || vm.userData.userType == 'PendingPIForPI')
                         {
                         alert ("This functionality is only available to the Primary Investigator of the VIP Project")
                         return;
                         }




                         */
                        User.verifyEmail($stateParams.user_id, vm.userData)
                            .success(function(data) {
                                vm.processing = false;
                                //Here we can send an Email to the PI with the appropriate link to register a faculty or PI
                                // vm.stuff = vm.data;
                                //alert(vm.stuff.userType)
                                vm.message = data.message;
                                //alert(vm.userData.userType)
                                userEmail = vm.userData.email;
                                if (vm.userData.userType == "PendingFaculty") {

                                    vm.userData.email = "amitc029@fiu.edu";
                                    vm.userData.subject = "FIU VIP : A New User is Attempting to Register";
                                    vm.userData.text = "The user " + vm.userData.f_name + " " + vm.userData.l_name + " is attempting to register as a" +
                                        " Faculty Member. Use this link to verify the user or delete the user if they are not a proper user type." +
                                        "\n\n localhost:3000/piverification/" + vm.userData._id + "";

                                    User.nodeEmail(vm.userData)
                                        .success(function(data) {
                                            //vm.userData = data;
                                            //alert(vm.userData.email)
                                            vm.userData.email = userEmail;
                                            vm.userData.subject = "FIU VIP : PI Verification Required";
                                            vm.userData.text = "Dear " + vm.userData.f_name + " " + vm.userData.l_name +",\n\nThank you for registering as a " +
                                                "Faculty member. You will now have to wait for the Principle Investigator to approve of your registration before you log in." +
                                                "\n\n Have a great day, \n\n-FIU VIP Team";

                                            User.nodeEmail(vm.userData)
                                                .success(function(data) {
                                                    //vm.userData = data;

                                                });

                                        });
                                }
                                if (vm.userData.userType == "PendingPI") {


                                    vm.userData.email = "amitc029@fiu.edu";
                                    vm.userData.subject = "FIU VIP : A New User is Attempting to Register";
                                    vm.userData.text = "The user " + vm.userData.f_name + " " + vm.userData.l_name + " is attempting to register as a" +
                                        "PI/CoPI. Use this link to verify the user or delete the user if they are not a proper user type." +
                                        "\n\n localhost:3000/piverification/" + vm.userData._id + "";

                                    User.nodeEmail(vm.userData)
                                        .success(function(data) {
                                            vm.userData.email = userEmail;
                                            vm.userData.subject = "FIU VIP : PI Verification Required";
                                            vm.userData.text = "Dear " + vm.userData.f_name + " " + vm.userData.l_name +",\n\nThank you for registering as a " +
                                                "PI/CoPI. You will now have to wait for the Principle Investigator to approve of your registration before you log in." +
                                                "\n\n Have a great day, \n\n-FIU VIP Team";

                                            User.nodeEmail(vm.userData)
                                                .success(function(data) {
                                                    //vm.userData = data;

                                                });


                                        });
                                }
                                if (vm.userData.userType == "PendingStaff") {
                                    //Hard coded PI email
                                    vm.userData.email = "amitc029@fiu.edu";
                                    vm.userData.subject = "FIU VIP : A New User is Attempting to Register";
                                    vm.userData.text = "The user " + vm.userData.f_name + " " + vm.userData.l_name + " is attempting to register as a" +
                                        " Staff Member. Use this link to verify the user or delete the user if they are not a proper user type." +
                                        "\n\n localhost:3000/piverification/" + vm.userData._id + "";

                                    User.nodeEmail(vm.userData)
                                        .success(function(data) {
                                            //vm.userData = data;
                                            vm.userData.email = userEmail;
                                            vm.userData.subject = "FIU VIP : PI Verification Required";
                                            vm.userData.text = "Dear " + vm.userData.f_name + " " + vm.userData.l_name +",\n\nThank you for registering as a " +
                                                "Staff Member. You will now have to wait for the Principle Investigator to approve of your registration before you log in." +
                                                "\n\n Have a great day, \n\n-FIU VIP Team";

                                            User.nodeEmail(vm.userData)
                                                .success(function(data) {
                                                    //vm.userData = data;

                                                });

                                        });
                                }

                                if(vm.userData.userType == "PendingStudent"){

                                    vm.userData.subject = "FIU VIP : Welcome!";
                                    vm.userData.text = "Dear " + vm.userData.f_name + " " + vm.userData.l_name +",\n\nThank you for registering as a " +
                                        "new student. You should now be able to log into the website." +
                                        "\n\n Have a great day, \n\n-FIU VIP Team";

                                    User.nodeEmail(vm.userData)
                                        .success(function(data) {
                                            //vm.userData = data;

                                        });
                                }

                                // clear the form


                                // bind the message from our API to vm.message
                                //vm.message = data.message;

                                alert(vm.message)
                            });
                    });
            }

            vm.pIVerify = function() {
                vm.processing = true;
                vm.message = '';

                if (confirm('Do you really want to verify this user?')) {

                } else {
                    return false;
                }
                User.get($stateParams.user_id)
                    .success(function(data) {
                        vm.userData = data;
                        User.pIVerify($stateParams.user_id, vm.userData)
                            .success(function (data) {
                                vm.processing = false;
                                vm.message = data.message;
                                //Here we can send an Email to the PI with the appropriate link to register a faculty or PI
                                vm.userData.subject = "FIU VIP! PI Has Officially Verified You.";
                                vm.userData.text = "The PI has finally verified your account. You can now log in!";
                                User.nodeEmail(vm.userData)
                                    .success(function(data) {
                                        //vm.userData = data;

                                    });
                                // clear the form
                                vm.userData = {};

                                // bind the message from our API to vm.message

                                alert(vm.message)
                            });

                    });

                /*We should boot the user if they are not a PI and the userType is 'PendingFaculty' or 'PendingPI'

                 if(USERLOGINTYPE != PI && (vm.userData.userType == 'PendingFacultyForPI' || vm.userData.userType == 'PendingPIForPI')
                 {
                 alert ("This functionality is only available to the Primary Investigator of the VIP Project")
                 return;
                 }
                 */

                //if(vm.userData !== undefined && vm.userData !== null){

                //alert ("Past Here!")


                /*
                 }else {
                 alert("This user doesn't exist")
                 return;
                 }
                 */

            }

            vm.deleteUser = function() {
                vm.processing = true;
                vm.message = '';
                vm.userData;



                if (confirm('Do you really want to delete this user?')) {

                } else {
                    return false;
                }


                User.get($stateParams.user_id)
                    .success(function (data) {
                        vm.userData = data;
                        //alert(data.f_name)
                        //alert(data.userType)
                        //vm.userData.userType = data.userType;
                        //alert(vm.userData.userType)
                        //alert(vm.userData.userType)
                        if(vm.userData.userType == "Student")
                        {
                            vm.userData = {};
                            alert("This user is already a student, you cannot delete him.")
                            return;
                        }
                        if(vm.userData.userType == "PI/CoPI")
                        {
                            vm.userData = {};
                            alert("This user is already a PI, you cannot delete him.")
                            return;
                        }
                        if(vm.userData.userType == "Faculty")
                        {
                            vm.userData = {};
                            alert("This user is already a faculty member, you cannot delete him.")
                            return;
                        }
                        if(vm.userData.userType == "Staff")
                        {
                            vm.userData = {};
                            alert("This user is already a Staff Member, you cannot delete him.")
                            return;
                        }



                        User.delete($stateParams.user_id)
                            .success(function(data){
                                vm.processing = false;
                                vm.message = data.message;
                                vm.userData.subject = "FIU VIP : Your registration has been declined.";
                                vm.userData.text = "The Principle Investigator of the FIU VIP project has declined your attempt at" +
                                    " registration. Please try to register under a different user type, or contact the PI directly for" +
                                    " details on why he declined you.";
                                User.nodeEmail(vm.userData)
                                    .success(function(data) {
                                        //vm.userData = data;

                                    });
                                alert(vm.message)
                            });
                    });
                //vm.userData = data;



                //if(vm.userData !== undefined && vm.userData !== null){
                // vm.userData.userType = data.userType;


                /*
                 }else {
                 alert("This user doesn't exist")
                 return;
                 }
                 */
            }
        }
    )

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
            vm.objectId = '';

            var xferstr = vm.userData.email;
            vm.userData.email = xferstr.toLowerCase();

            //Calls validRegistration function to make sure the information is good!
            if(!validRegistration(vm.userData)){
                return;
            }
            //Assigns the user a username using their FIU email
            var str = vm.userData.email;
            var str = str.substring(0, str.length - 8);
            vm.userData.username = str;



            // use the create function in the userService
            User.create(vm.userData)
                .success(function(data) {
                    vm.processing = false;
                    //Here we have the user ID so we can send an email in the future when that is released
                    vm.objectId = data.objectId;
                    //alert(vm.objectId)
                    vm.userData._id = vm.objectId;
                    vm.message = data.message;
                    alert(vm.message)
                    vm.userData.text = "Welcome to FIU's VIP Project, follow this link to verify this email address!\n\nlocalhost:3000/verification/" + vm.objectId + "";
                    vm.userData.subject = "Welcome to FIU VIP Project!";
                    User.nodeEmail(vm.userData);
                    vm.userData = {};
                });
            //alert(vm.message)
            //Need to wait for notifications to be implemented.
            //email_verification(vm.userData.email, vm.userData.objectId);
        };

        //this function allows us to create a user with random required inputs, they DO NOT follow the database schema!
        //It speeds up testing for other code that requires a new user to be created
        vm.runTest = function(){
            vm.processing = true;
            vm.userData.f_name = "kanye" + Math.floor((Math.random() * 10000)+1) + "";
            vm.userData.l_name = "kanye123";
            vm.userData.pID = "kanye" + Math.floor((Math.random() * 10000)+1) + "";
            vm.userData.username = "kanye" + Math.floor((Math.random() * 10000)+1) + "";
            vm.userData.password = "kanye";
            vm.userData.email = "kanye" + Math.floor((Math.random() * 10000)+1) + "@fiu.edu";
            vm.userData.userType = "PendingPI";

            User.create(vm.userData)
                .success(function(data) {
                    // vm.processing = false;
                    // vm.userData = {};
                    vm.message = data.message;
                    vm.objectId = data.objectId;

                    alert(vm.objectId)

                    alert(vm.message)

                });
        };

    })

    // controller applied to user edit page
    .controller('userEditController', function($stateParams, User) {

        var vm = this;

        // variable to hide/show elements of the view
        // differentiates between create or edit pages
        vm.type = 'edit';

        // get the user data for the user you want to edit
        // $stateParams is the way we grab data from the URL
        User.get($stateParams.user_id)
            .success(function(data) {
                vm.userData = data;
            });



        // function to save the user
        vm.saveUser = function() {
            vm.processing = true;
            vm.message = '';

            // call the userService function to update
            User.update($stateParams.user_id, vm.userData)
                .success(function(data) {
                    vm.processing = false;

                    // clear the form
                    vm.userData = {};

                    // bind the message from our API to vm.message
                    vm.message = data.message;
                });
        };

    })
    /*Controller to control faculty memeber accepting rejecting students from project
    * -implemented by Garrett Lemieux */
    .controller('facultyController', function(User) {

        var vm = this;

        //Test variable array
        // vm.users = [{firstName:'Lukas'},{firstName:'Tiago'},{firstName:'Andrew'}];
        vm.facultyProjNum = "one";
        vm.resu = "This is Tiago's Resume!";
        vm.hidemeTwo = true;
        vm.hidemeOne = false;
        vm.txtcomment = {};

        // grab all students in project at page load
        // "User" refers to userService factory object
        User.studInProj(vm.facultyProjNum)
            .success(function(data) {
                // bind the users that come back to vm.users
                vm.users = data;
            });

        vm.displayAcpt = {};
        vm.displayRej = {};

        vm.accept = function(id , index){

            vm.displayAcpt[index] = true;
            vm.displayRej[index]= false;

            User.updateFacAcp(id)

                // if the function succeeds repopulate table with new changes
                .success(function (data){
                    alert("Returned data from updateFacAcp");
                    //vm.users = data;
                })

        }

        vm.reject = function(id , index){

            vm.displayAcpt[index] = false;
            vm.displayRej[index]= true;

            User.updateFacRjt(id)

                // if the function succeeds repopulate table with new changes
                .success(function (data){
                    alert("Returned data from updateFacRjt");
                //vm.users = data;
                })

        }

        vm.resume = function(id){
            //alert("Resume Button Works!");
            //Hides the current Students to display resume of specified student
            vm.hideOne();

            //Need to get resume and display in new window
            User.get(id)
                .success(function(data) {
                    vm.resumeData = data;
                });
        }

        vm.subCom = function(id,index){
            alert(vm.userData.txtcomment[index]);

            //vm.userData = vm.userData[index].txtcomment;
            //Need to  update the user wit txtcoment
            User.update(id ,vm.userData)
                .success(function(data){
                    alert("returned data");
                });

            vm.userData.txtcomment = {};

        }

        vm.hideOne = function(){
            //Hides students in the project and display resume of a student
            vm.hidemeOne = true;
            vm.hidemeTwo = false;
        }

        vm.hideTwo = function(){
            //Hides resume of student and displays students in the project
            vm.hidemeTwo = true;
            vm.hidemeOne = false;
        }

    });


//Andrew Mitchell

//Email So User can Verify Email Function
function email_verification(uemail){
    //Waiting for notification to be completed.
}
//Registration Validation Functions
//Makes sure nothing is blank &&

//Makes sure the email is @fiu.edu or .fiu.edu (NEED TO FIX!)
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
    var uemail_source = uemail.substring(uemail_len - 8, uemail_len);
    if (uemail_source.toLowerCase() != "@fiu.edu") {
        alert("Email should be an @fiu.edu account")
        return false;
    }

    /* Need a check if the email is in the DB once we learn to connect*/
    return true;
}

//Makes sure first name is only letters
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

//makes sure middle name is only letters
function middle_validation(middle) {

    if(middle == undefined)
    {
        //alert("Middle name should not be empty.")
        return true;
    }
    var middle_len = middle.length;
    if (middle_len == 0) {
        //alert("Middle name should not be empty.");
        return true;
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

//Makes sure last name is only letters
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

//Makes sure panther ID is only numbers and of correct length
//NEED TO FIX PID BEING ENTERED AS A LETTER
function pid_validation(pid) {
    return true;
    if(pid == undefined)
    {
        alert("Panther ID should not be empty.")
        return false;
    }
    var numbers = /[0-9]/;
    if (pid.match(numbers)) {} else {
        alert('PID must have numeric characters only');
        return false;
    }
    var pid_len = pid.length;
    if (pid_len != 7) {
        alert("Please enter your 7 digit Panther-ID.");
        return false;
    }
    return true;
}

//Confirms that both passwords entered are correct.
function pass_validation(pass, passconf) {
    //Password no longer required.
    return true;
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

//Makes sure the cellphone is only numbers and 10 digits.
function cell_validation(cell) {
    if(cell == undefined)
    {
        //alert("Cell should not be empty.")
        return true;
    }
    var numbers = /[0-9]/;
    if (cell.match(numbers)) {} else {
        alert('Cell Phone must have numeric characters only');
        return false;
    }
    var cell_len = cell.length;
    if (cell_len != 10) {
        alert("Please enter a 10 digit number for your cell phone (no dashes).");
        return false;
    }
    return true;
}

//Ensures the user selected a rank
function rank_validation(rank) {
    //Rank is no longer required for registration.
    return true;
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

//Verifies the user selected a user Type
function userType_validation(userType) {
    if(userType == undefined)
    {
        alert("User Type should not be empty.")
        return false;
    }
    if (userType == "Default") {
        alert("userType is a required field.")
        return false;
    }

    return true;
}


function department_validation(department) {
    //Rank is no longer required for registration.
    if(department == undefined)
    {
        alert("Department should not be empty.")
        return false;
    }
    if (department == "Default") {
        alert("Department is a required field.")
        return false;
    }
    return true;
}

//Ensures the user Selected a college
function college_validation(college) {
    //College is no longer required for registration
    return true;
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

//Ensures the User Selected a Major
function major_validation(major) {
    //Major is no longer required for registration
    return true;
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

//Ensures that the User selected an Ethnicity
function ethnicity_validation(ethnicity) {
    //Ethnicity is no longer required for registration
    return true;
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

//Ensures the User selected a visaStatus
function visa_validation(visa) {
    //Visa is no longer required for validation
    return true;
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

//Ensures the user selected a Sex
function sex_validation(sex) {
    //Sex is no longer required for registration
    return true;
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

//Runs a check if the registration form filled out was filled out correctly.
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
    var department = userData.Department;
    var userType = userData.userType;



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
                                                        if(department_validation(department)){
                                                            if(userType_validation(userType))
                                                            {
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
        }
    }
    return false;
}