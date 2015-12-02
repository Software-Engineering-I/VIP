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
            eval.subjectTitle		= "Project Evaluation";  // set the subject for the email
            eval.feedbackMessage	= req.body.feedbackMessage;     // set the message

            eval.save(function(err) {
                if (err)
                    return res.send({message: err});

                // return a message
                res.json({ message: 'Evaluation Sent to ' + eval.student });
            });

            //// create reusable transporter object using SMTP transport
            //var transporter = nodemailer.createTransport({
            //    host:'a2plcpnl0330.prod.iad2.secureserver.net',
            //    port:465,
            //    secure:true,
            //    auth: {
            //        user: 'nodemail@amcustomprints.com',
            //        pass: 'spaceCC120'
            //    }
            //});
            //
            //// setup e-mail data with unicode symbols
            //var mailOptions = {
            //    from: 'Professor <nodemail@amcustomprints.com>', // sender address
            //    to: req.body.studentEmail, // list of receivers
            //    subject: eval.subjectTitle, // Subject line
            //    text: "Dear " + req.body.studentName + ",\n\nYou have received " +
            //    "the following feedback on your project evaluation:\n\n" +
            //    req.body.feedbackMessage // plaintext body
            //};
            //
            //// send mail with defined transport object
            //transporter.sendMail(mailOptions, function(error, info){
            //    if(error){
            //        return console.log(error);
            //    }
            //    console.log('Message sent: ' + info.response);
            //});

        });
    return apiRouter;
};