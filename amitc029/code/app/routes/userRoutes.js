var bodyParser    = require('body-parser');    // get body-parser
var User      = require('../models/user');

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

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/users')


        // create a user (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

            var user = new User();		// create a new instance of the User model
            user.f_name     = req.body.f_name;  // set the users name (comes from the request)
            user.m_name     = req.body.m_name;  // set the users middle name
            user.l_name     = req.body.l_name;  // set the users last name
            //user.pID        = req.body.pID;     // set the users panther ID
            user.username   = req.body.username;  // set the users username (comes from the request)
            //user.password   = req.body.password;  // set the users password (comes from the request)
            user.email      = req.body.email;   // sets the users email
            //user.project    = req.body.project; // sets the users project
            //user.cell       = req.body.cell;    // set the users cell phone #
            //user.Rank       = req.body.Rank;    // set the users Rank within the program
            //user.Major      = req.body.Major;   // sets the users Major
            //user.College    = req.body.College;  //sets the users College
            //user.Ethnicity  = req.body.Ethnicity;   // sets the users ethnicity
            //user.Sex        = req.body.Sex;   // sets the users sex
            //user.visaStatus = req.body.visaStatus;  // sets the users visa status
            user.userType   = req.body.userType;    //sets the user type
            user.Department = req.body.Department;  //sets which department they work for or study under.


            console.log(user.username)
            console.log(user.email)

            user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. Wtf'});
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
                res.json({message: users.userType});
            });
        });



    //Gets the user type from the user email.
    apiRouter.route('/usertype/:email')
        .get(function(req, res) {
            console.log("Hi")

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

        // update the user with this id
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {

                if (err) res.send(err);

                // set the new user information if it exists in the request
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;

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

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};