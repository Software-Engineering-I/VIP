//Created by Eduardo Guerra
//Contains the nodemailer object to send email on .post
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

module.exports = function(app, express) {
    
    var apiRouter = express.Router();
    
    apiRouter.route('/nodeemail') 
        .post(function(req, res) {
            
            //get email params
            var recipient = req.body.recipient;
            var sender = req.body.sender;
            var message = req.body.message;
            var subject = req.body.subject;
        
        console.log('inside the post');
        console.log(recipient);
        console.log(sender);
        console.log(message);
        console.log(subject);
            
            var transporter = nodemailer.createTransport({
                service:'Gmail',
                auth: {
                    user: 'fiuvipmailer@gmail.com',
                    pass: 'vipadmin123'
                }
            });
        
            var mailOptions = {
                from: sender, // sender address
                to: recipient,//mailList[i], // list of receivers
                subject: subject, //+ event.name, // Subject line
                text: message
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