var nodemailer = require('nodemailer'); 

var Notifications      = require('../models/notifications');
var config     = require('../../config/config');

module.exports = function(app, express) {
    var apiRouter = express.Router();
    
    apiRouter.route('/notifications')

        // create a msg (accessed at POST http://localhost:3000/api/notifications)
        .post(function(req, res) {
        
            var mailList = [req.body.email];

            // create a new instance of the notifications model
            var notifications = new Notifications();

            // set the notifications information (comes from the request)
            notifications.id = req.param('id');
            notifications.message = req.param('message');

            // save the notifications and check for errors
            notifications.save(function(err) {
                if (err) {
                    console.log(err);
                        return res.send(err);
                }

                res.json({ message: 'Message sent!' });
                console.log('Message sent!');
                
             
            });   
    
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
                subject: 'New Notification', // Subject line
                text: " A new notification received! \n\n" + notifications.message + "\nLINK: http://localhost:3000/snotifications"
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            }
        })

        .get(function(req,res){
                Notifications.find(function(err,inbox){
                    if(err){
                         res.send(err);
                    }
                    res.json(inbox);
                });
            });
        

    //apiRouter.route('/stuInbox')
        
  
    return apiRouter;
};
