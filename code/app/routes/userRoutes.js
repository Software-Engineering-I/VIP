var bodyParser    = require('body-parser');    // get body-parser
var User      = require('../models/user');
var nodemailer      = require('nodemailer');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    //SIMPLE NON-DEFAULT ROUTE
    // Andrew Mitchell 10/9/2015

    //First we define the name of our route.
    /*
     var regRouter = express.Router();

     //We then define what html page we want to send
     regRouter.get('/', function(req, res){
     res.sendfile('./public/app/views/registration.html');
     });

     //This page can be accessed by going to base page + /registration/secretpage
     regRouter.get('/secretpage', function(req, res){
     res.sendfile('./public/app/views/page/all.html');
     });

     regRouter.get('/secretpage2', function(req, res){
     res.sendfile('./public/app/views/pages/create.html');
     });

     //Next we do the 'use' function calling our route as well as what html address it should be accessed from.
     //This for example is the base route with the addition of /registration. Ex : localhost:3000/registration
     app.use('/registration', regRouter);
     */
    //End of SIMPLE NON-DEFAULT ROUTE

    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/api
    apiRouter.get('/', function(req, res) {
        console.log("Visited root")
    });


    apiRouter.route('/nodeemail')
        .post(function(req, res) {
            var mailList = [req.body.email];
            //console.log(req.body._id)
            //console.log(req.body.email);
            var text = req.body.text;
            var subject = req.body.subject;
            //var id = req.body._id;
            //mailList[mailList.length] = req.body.email;
            //console.log("We fuckin in here mate")
            //console.log(mailList[0])
            //console.log(mailList[1])
            var transporter = nodemailer.createTransport({
                host:'a2plcpnl0330.prod.iad2.secureserver.net',
                port:465,
                secure:true,
                auth: {
                    user: 'nodemail@amcustomprints.com',
                    pass: 'spaceCC120'
                }
            });

            var i;
            for (i = 0; i < mailList.length; i++){
                var mailOptions = {
                    from: 'Masoud Sadjadi <vipadmin@fiu.edu>', // sender address
                    to: mailList[i], // list of receivers
                    subject: subject, // Subject line
                    text: text
                };
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            }
            res.json({message: "hello"});
        })

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/users')


        // create a user (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

            var user = new User();		// create a new instance of the User model
            user.f_name     = req.body.f_name;  // set the users name (comes from the request)
            if(req.body.m_name == undefined){
                user.m_name = null;
            }else {user.m_name     = req.body.m_name;}// set the users middle name

            user.l_name     = req.body.l_name;  // set the users last name
            user.username   = req.body.username;  // set the users username (comes from the request)
            user.email      = req.body.email;   // sets the users email
            user.project    = null; // sets the users project
            if(req.body.cell == undefined){
                user.cell = null;
            }else {user.cell       = req.body.cell;}// set the users cell phone #
            user.userType   = req.body.userType;    //sets the user type
            user.Department = req.body.Department;  //sets which department they work for or study under.


            //The rest of these get set to null so others can modify it in the future.
            user.rank       = null;    // set the users Rank within the program
            user.major      = null;   // sets the users Major
            user.college    = null;  //sets the users College
            user.ethnicity  = null;   // sets the users ethnicity
            user.race       = null;
            user.sex        = null;   // sets the users sex
            user.visaStatus = null;  // sets the users visa status
            user.project    = Unassigned;
            user.displayName = null;
            user.currentProject = null;
            user.picture    = null;
            user.google     = null;
            user.staffApproval = null;
            user.piApproval     = null;
            user.year           = null;
            user.placeOfBirth           = null;
            user.userSummary           = null;
            user.school           = null;
            user.creditsCompleted           = null;
            user.gpa           = null;
            user.degreeType           = null;
            user.degreeCompletionStatus           = null;
            user.relevantCourses           = null;
            user.workCompany           = null;
            user.workPosition           = null;
            user.workTime           = null;
            user.workStatus           = null;
            user.workSummary           = null;
            user.workHighlights           = null;
            user.skills           = null;
            user.volunteerOrganization           = null;
            user.volunteerPosition           = null;
            user.volunteerTime           = null;
            user.volunteerWebsite           = null;
            user.volunteerSummary           = null;
            user.volunteerHighlights           = null;
            user.interestList           = null;
            user.firstReferenceName           = null;
            user.firstReferenceEmail           = null;
            user.firstReferenceNotes           = null;
            user.secondReferenceName           = null;
            user.secondReferenceEmail           = null;
            user.secondReferenceNotes           = null;

            // console.log(user.username)
            // console.log(user.email)

            user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists.'});
                    else
                        return res.send(err);

                }

                // return the newly created objectId as well as a success message.

                res.json({ objectId: user._id, message: 'User created!' });
                //res.json({ objectId: 'hello23412' });
                //console.log(user.message);
                // req.body._id = user._id;
                //console.log(req.body._id);
            });

        })

        // get all the users (accessed at GET http://localhost:8080/api/users)
        .get(function(req, res) {

            User.find({}, function(err, users) {
                if (err) res.send(err);

                // return the users
                res.json(users);
            });
        })
            // remove the user from the project
        .put(function(req, res){

            User.findById(req.body.userId, function(err, user){
                    if(err) res.send(err);

                    if(!req.body.project){

                        user.project = "Unassigned"
                    }
                    else{
                        user.project= req.body.project;
                    }

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            })
        });






    //Gets the user type from the user email.
    apiRouter.route('/usertype/:email')
        .get(function(req, res) {
            //console.log("Hi")

            User.findOne({'email' : new RegExp(req.params.email, 'i')}, function(err, user){
                if(err) res.send(err);
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                console.log(user.userType);
                res.json({message: user.userType});

            });

            /*
             User.findOne({'email': 'mohamed'}, function(err, user){
             console.log('into mongoose findone');
             });
             */
        })

    //GET USER FROM THE EMAIL
    apiRouter.route('/userinfo/:email')
        .get(function(req, res) {
            //console.log("Hi")

            User.findOne({'email' : new RegExp(req.params.email, 'i')}, function(err, user){
                if(err) res.send(err);
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                res.json(user);

            });

            /*
             User.findOne({'email': 'mohamed'}, function(err, user){
             console.log('into mongoose findone');
             });
             */
        })

    //On routes that end in /verification/:user_id
    apiRouter.route('/verification/:user_id')
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                //console.log(user)
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                var checker = 0;
                // set the new user information if it exists in the request
                //This function will update the user from a user without a verified email.


                if (user.userType == "PendingStudent"){
                    checker = 1;
                    user.userType = "Student";
                }

                //if (req.body.userType == 'PendingStudent') user.userType = 'Student';


                else if (user.userType == "PendingFaculty")
                {
                    checker = 2;
                    user.userType = "PendingFacultyForPI";
                }
                //if (req.body.userType == 'PendingFacultyForPI') user.userType = 'Faculty';
                else if (user.userType == "PendingPI") {
                    checker = 3;
                    user.userType = "PendingPIForPI";
                }
                else if (user.userType == "PendingStaff") {
                    checker = 4;
                    user.userType = "PendingStaffForPI";
                }
                //if (req.body.userType == 'PendingPIForPI') user.userType = 'PI';

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message

                    if(checker == 1) {
                        res.json({message: 'Email Verified! You can now login!'});
                    }
                    else if(checker == 2) {
                        //Here we email the PI the page to verify a member as faculty
                        res.json({message: 'Email Verified! The Principle Investigator must now verify you are faculty before you can login.'});
                    }
                    else if(checker == 3) {

                        //Here we email the PI the page to verify a member as a PI.
                        res.json({message: 'Email Verified! The Principle Investigator must now verify you are a PI before you can login.'});
                    }
                    else if(checker == 4) {

                        //Here we email the PI the page to verify a member as a Staff.
                        res.json({message: 'Email Verified! The Principle Investigator must now verify you are a Staff before you can login.'});
                    }

                    else res.json({message: 'Error, this user is not a pending student, faculty, staff or PI'})
                });

            });
        })

    apiRouter.route('/piverification/:user_id')
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                var checker = 0;
                // set the new user information if it exists in the request
                //This function will update the user from a

                if (user.userType == "PendingFacultyForPI")
                {
                    checker = 2;
                    user.userType = "Faculty";
                }
                //if (req.body.userType == 'PendingFacultyForPI') user.userType = 'Faculty';
                else if (user.userType == "PendingPIForPI") {
                    checker = 3;
                    user.userType = "PI/CoPI";
                }
                else if (user.userType == "PendingStaffForPI") {
                    checker = 4;
                    user.userType = "Staff";
                }
                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    if(checker == 2) {
                        //Here we email the PI the page to verify a member as faculty
                        res.json({message: 'The user is now a verified faculty member.'});
                    }
                    else if(checker == 3) {

                        //Here we email the PI the page to verify a member as a PI.
                        res.json({message: 'The user is now a verified PI'});
                    }
                    else if(checker == 4) {

                        //Here we email the PI the page to verify a member as a PI.
                        res.json({message: 'The user is now a verified Staff'});
                    }
                    else if(checker == 5) {

                        //Here we email the PI the page to verify a member as a PI.
                        res.json({message: 'The user does not exist.'});
                    }

                    else res.json({message: 'Error, this user is not a pending faculty or PI awaiting the a PIs verification.'})
                });

            });
        })


    // on routes that end in /facusers/:user_id
    // -- implemented by Garrett Lemieux
    // ---------------------------------------------------

    apiRouter.route('/facprojects/:projectName')
        // get all users in project x
        .get(function(req, res) {
            User.find({project:req.params.projectName}, function(err, user) {
                if (err) res.send(err);
                if( user == null)
                {
                    //res.json({message: 'User does not exist.'});
                    return;
                }
                // return the user
                res.json(user);
            });
        })


    apiRouter.route('/userPeers/:projectName/:email')
        // get all users in project x excluding person with email provided
        .get(function(req, res) {
            User.find({project:req.params.projectName ,email:{$ne:req.params.email}},function(err, user) {
                if (err) res.send(err);
                if( user == null) {
                    console.log("Hello from Garrett's null!")
                    //res.json({message: 'User does not exist.'});
                    return;
                }
                console.log(user)
                // return that user
                res.json(user);
            });
        })


    apiRouter.route('/studentProject/:email')
        // get all users in project x
        .get(function(req, res) {
            User.findOne({email:req.params.email},function(err, user) {
                if (err) res.send(err);
                if( user == null) {
                    console.log("Hello from Garrett's null!")
                    //res.json({message: 'User does not exist.'});
                    return;
                }
                console.log("Hey")
                // return that user
                res.json(user.project);
            });
        })

    // on routes that end in /facusersaccept/:user_id
    // -- implemented by Garrett Lemieux
    // ---------------------------------------------------

    apiRouter.route('/facusersaccept/:user_id')
        // update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                user.staffApproval = "accept";

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })


    // on routes that end in /facusersreject/:user_id
    // -- implemented by Garrett Lemieux
    // ---------------------------------------------------

    apiRouter.route('/facusersreject/:user_id')

        // update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                user.staffApproval = "reject";

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })

    // on routes that end in /users/:user_id
    // ---------------------------------------------------


    apiRouter.route('/users/:user_id')

        // get the user with that id
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                // return that user
                res.json(user);
            });
        })

        // update the facComment in user
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                // set the new user information if it exists in the request
                //if (req.body.name) user.name = req.body.name;
                //if (req.body.username) user.username = req.body.username;
                //if (req.body.password) user.password = req.body.password;
                /* Still implementing - Garrett
                 if (req.body.facComment) user.facComment = req.body.facComment;
                 */

                //console.log(req.body.indexthing);

                user.facComment = req.body.comment;

                // save the user
                user.save(function(err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })

        // delete the user with this id
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) res.send(err);


                res.json({ message: 'Successfully deleted' });
            });
        });
    //Routes for Uploading Resume
    apiRouter.route('/resume/:email')
        .put(function(req, res) {
            //console.log("Hi")
            console.log(req.params.email)

            User.findOne({'email' : new RegExp(req.params.email, 'i')}, function(err, user){
                if(err) res.send(err);
                if( user == null)
                {
                    //console.log("Hello from null!")
                    res.json({message: 'User does not exist.'});
                    return;
                }

                user.rank       = req.body.rank;    // set the users Rank within the program
                user.major      = req.body.major;   // sets the users Major
                user.college    = req.body.college;  //sets the users College
                user.ethnicity  = req.body.ethnicity;   // sets the users ethnicity
                user.race       = req.body.race;
                user.sex        = req.body.sex;   // sets the users sex
                user.visaStatus = req.body.visaStatus;  // sets the users visa status
                user.year           = req.body.year;
                user.placeOfBirth           = req.body.placeOfBirth;
                user.userSummary           = req.body.userSummary;
                user.school           = req.body.school;
                user.cell             = req.body.cell;
                user.creditsCompleted           = req.body.creditsCompleted;
                user.gpa           = req.body.gpa;
                user.degreeType           = req.body.degreeType;
                user.degreeCompletionStatus           = req.body.degreeCompletionStatus;
                user.relevantCourses           = req.body.relevantCourses;
                user.workCompany           = req.body.workCompany;
                user.workPosition           = req.body.workPosition;
                user.workTime           = req.body.workTime;
                user.workStatus           = req.body.workStatus;
                user.workSummary           = req.body.workSummary;
                user.workHighlights           = req.body.workHighlights;
                user.skills           = req.body.skills;
                user.volunteerOrganization           = req.body.volunteerOrganization;
                user.volunteerPosition           = req.body.volunteerPosition;
                user.volunteerTime           = req.body.volunteerTime;
                user.volunteerWebsite           = req.body.volunteerWebsite;
                user.volunteerSummary           = req.body.volunteerSummary;
                user.volunteerHighlights           = req.body.volunteerHighlights;
                user.interestList           = req.body.interestList;
                user.firstReferenceName           = req.body.firstReferenceName;
                user.firstReferenceEmail           = req.body.firstReferenceEmail;
                user.firstReferenceNotes           = req.body.firstReferenceNotes;
                user.secondReferenceName           = req.body.secondReferenceName;
                user.secondReferenceEmail           = req.body.secondReferenceEmail;
                user.secondReferenceNotes           = req.body.secondReferenceNotes;

                user.save(function(err) {
                    if (err) {
                        return res.send(err);

                    }
                    console.log(user.userType);
                    res.json({message: "Resume submitted."});

                });

            });
        });

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};