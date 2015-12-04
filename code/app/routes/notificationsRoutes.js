var nodemailer = require('nodemailer'); 

var Notifications      = require('../models/notifications');
var config     = require('../../config/config');

module.exports = function(app, express) {
    var apiRouter = express.Router();
    
    apiRouter.route('/notifications')

        // create a msg (accessed at POST http://localhost:3000/api/notifications)
        .post(function(req, res) {

            // create a new instance of the notifications model
            var notifications = new Notifications();

            // set the notifications information (comes from the request)
            notifications.id = req.body.id;
            notifications.message = req.body.message;

            // save the notifications and check for errors
            notifications.save(function(err) {
                if (err) {
                    console.log(err);
                        return res.send(err);
                }

                res.json({ message: 'Message sent!' });
                console.log('Message sent!');
                
            });   
        })

        .get(function(req,res){
                Notifications.find(function(err,inbox){
                    if(err){
                         res.send(err);
                    }
                    res.json(inbox);
                });
            });

    return apiRouter;
};
