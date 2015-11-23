var bodyParser		= require('body-parser');    // get body-parser
var Evaluation	    = require('../models/projectEvaluation');
var nodemailer      = require('nodemailer');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/projectEvaluations')
        // create a user (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

            var eval = new Evaluation();      // create a new instance of the Report model
            eval.studentName		= req.body.studentName;  // set the users name
            eval.studentEmail		= req.body.studentEmail;  // set the users email
            eval.subjectTitle		= req.body.subjectTitle;  // set the subject for the email
            eval.feedbackMessage	= req.body.feedbackMessage;     // set the message

            eval.save(function(err) {
                if (err)
                    return res.send({message: err});

                // return a message
                res.json({ message: 'Evaluation Sent to ' + req.body.studentName });
            });

             // create reusable transporter object using SMTP transport
             var transporter = nodemailer.createTransport({
                 host:'a2plcpnl0330.prod.iad2.secureserver.net',
                 port:465,
                 secure:true,
                 auth: {
                 user: 'nodemail@amcustomprints.com',
                 pass: 'spaceCC120'
                 }
             });

             // NB! No need to recreate the transporter object. You can use
             // the same transporter object for all e-mails

             // setup e-mail data with unicode symbols
             var mailOptions = {
                 from: 'Professor <nodemail@amcustomprints.com>', // sender address
                 to: req.body.studentEmail, // list of receivers
                 subject: req.body.subjectTitle, // Subject line
                 text: "Dear " + req.body.studentName + ",\n\nYou have received " +
                  "the following feedback on your project evaluation:\n\n" +
                    req.body.feedbackMessage // plaintext body
             };

             // send mail with defined transport object
             transporter.sendMail(mailOptions, function(error, info){
             if(error){
                return console.log(error);
             }
             console.log('Message sent: ' + info.response);
             });

        });
    return apiRouter;
};