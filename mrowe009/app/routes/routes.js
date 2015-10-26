var bodyParser		= require('body-parser');    // get body-parser
var Report			= require('../models/report');
var config			= require('../../config');

module.exports = function(app, express) {

	var apiRouter = express.Router();

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/reports')
        // create a user (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

            var report = new Report();      // create a new instance of the Report model
            report.question1		= req.body.question1;  // set the users name (comes from the request)
            report.question2		= req.body.question2;  // set the users middle name
            report.question3		= req.body.question3;  // set the users last name
            report.question4		= req.body.question4;     // set the users panther ID
            report.question5		= req.body.question5;  // set the users username (comes from the request)
            report.question6		= req.body.question6;  // set the users password (comes from the request)
            report.question7		= req.body.question7;   // sets the users email
            report.question8		= req.body.question8; // sets the users project
            report.question9		= req.body.question9;    // set the users cell phone #
            report.question10		= req.body.question10;    // set the users Rank within the program
            report.question11		= req.body.question11;   // sets the users Major

            report.save(function(err) {
            	if (err)
            		return res.send({message: err});

                // return a message
                res.json({ message: 'Report created!' });
            });

        });
return apiRouter;
};