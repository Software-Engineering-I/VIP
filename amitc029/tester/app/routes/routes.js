var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

    var apiRouter = express.Router();
/*
    //SIMPLE NON-DEFAULT ROUTE
    // Andrew Mitchell 10/9/2015

    //First we define the name of our route.
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

    //End of SIMPLE NON-DEFAULT ROUTE
*/
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
            user.pID        = req.body.pID;     // set the users panther ID
            user.username   = req.body.username;  // set the users username (comes from the request)
            user.password   = req.body.password;  // set the users password (comes from the request)
            user.email      = req.body.email;   // sets the users email
            user.project    = req.body.project; // sets the users project
            user.cell       = req.body.cell;    // set the users cell phone #
            user.Rank       = req.body.Rank;    // set the users Rank within the program
            user.Major      = req.body.Major;   // sets the users Major
            user.College    = req.body.College;  //sets the users College
            user.Ethnicity  = req.body.Ethnicity;   // sets the users ethnicity
            user.Sex        = req.body.Sex;   // sets the users sex
            user.visaStatus = req.body.visaStatus;  // sets the users visa status

            user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. '});
                    else
                        return res.send(err);

                }

                // return a message

                res.json({ message: 'User created!' });
            });

        })

        // get all the users (accessed at GET http://localhost:8080/api/users)
        .get(function(req, res) {

            User.find({}, function(err, users) {
                if (err) res.send(err);

                // return the users
                res.json(users);
            });
        });

    // on routes that end in /users/:user_id
    // ----------------------------------------------------
    apiRouter.route('/users/:user_id')

        // get the user with that id
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);

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