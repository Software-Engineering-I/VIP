var nodemailer = require('nodemailer'); 

var Notifications      = require('../models/notifications');
//var stuInbox           = require('../models/stuInbox');
var config     = require('../../config/config');

module.exports = function(app, express) {
    var apiRouter = express.Router();
     var mailList = ["aniet009@fiu.edu"];
    
    apiRouter.route('/notifications')

        // create a msg (accessed at POST http://localhost:3000/api/notifications)
        .post(function(req, res) {

            // create a new instance of the notifications model
            var notifications = new Notifications();

            // set the notifications information (comes from the request)
            notifications.id = req.param('id');
            notifications.message = req.param('message');
//            notifications.id = 'asada321';
//            notifications.message = 'asfasf';

            // save the notifications and check for errors
            notifications.save(function(err) {
                if (err) {
                    console.log(err);
                        return res.send(err);
                }

                res.json({ message: 'Message sent!' });
                console.log('Message sent!');
                
             
            });   
        
               //-------------------EDUARDO-------------------------
              var transporter = nodemailer.createTransport({
              host:'a2plcpnl0330.prod.iad2.secureserver.net',
              port:465,
              secure:true,
              auth: {
                  user: 'nodemail@amcustomprints.com',
                  pass: 'spaceCC120'
              }
          });
    
          var mailOptions = {
              from: 'Masoud Sadjadi <admin@vip.fiu.edu>', // sender address
              to: 'aniet009@fiu.edu', // list of receivers, comma separated
              subject: 'Sample subject', //Subject line, put it in quotes
              text: 'Hello Alan' //Your text here, put it in quotes
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  return console.log(error);
              }
              console.log('Message sent: ' + info.response);
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
                text: " A new notification received!"
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            }
        });

    /*.get(function(req,res){
            Notifications.find(function(err,inbox){
                if(err){
                    console.log('here1');
                     res.send(err);
                }
                console.log('here2');
                res.json(inbox);
            });
        });
        */

    //apiRouter.route('/stuInbox')
        
  
    return apiRouter;
};
