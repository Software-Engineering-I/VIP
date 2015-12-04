var bodyParser    = require('body-parser');    // get body-parser
var Evaluation	    = require('../models/projectEvaluation');
var nodemailer      = require('nodemailer');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.route('/projectEvaluations')
        .post(function(req, res) {

            var eval = new Evaluation();      // create a new instance of the Evaluation model
            eval.project		    = req.body.project;  // set the users name
            eval.student		    = req.body.student;  // set the users email
            eval.email              = req.body.email;
            eval.subjectTitle		= "Project Evaluation";  // set the subject for the email
            eval.feedbackMessage	= req.body.feedbackMessage;     // set the message

            eval.save(function(err) {
                if (err)
                    return res.send({message: err});

                // return a message
                res.json({ message: 'Evaluation Sent to ' + eval.student });
            });

        });
    return apiRouter;
};