
var Event      = require('../models/event');
var config     = require('../../config/config');
var nodemailer = require('nodemailer');


module.exports = function(app, express) {
    var apiRouter = express.Router();
    //var mailList = ["jcasa050@fiu.edu"];
    
    apiRouter.route('/events')

        .post(function(req, res) {

            // create a new instance of the event model
            var event = new Event();

            // set the event information (comes from the request)
            event.name = req.body.name;
            event.message = req.body.message;

        console.log('here');
            var e = new Date(req.body.date);
            var t = new Date(req.body.datetime);
        console.log(e);
            event.year = e.getFullYear();
        console.log(event.year);
            event.month = e.getMonth()+1;
            event.day = e.getDate();
            event.hour = t.getHours();
        console.log(event.hour);
            event.minutes = t.getMinutes();
        console.log(event.minutes);
            event.date = new Date(event.year,(event.month-1),event.day,event.hour,event.minutes,0,0);
        console.log(event.date);
        
            var today = new Date();
            if(event.date < today){
                return res.json({message: 'Event date is before today'});
            }

            // save the event and check for errors
            mailList[mailList.length] = req.body.email;
            event.save(function(err) {
                if (err) {
                        return res.send(err);
                }

                res.json({ message: 'Event created!' });
                console.log('event created');
            });
        
            // create reusable transporter object using SMTP transport
//            var transporter = nodemailer.createTransport({
//                host:'a2plcpnl0330.prod.iad2.secureserver.net',
//                port:465,
//                secure:true,
//                auth: {
//                    user: 'nodemail@amcustomprints.com',
//                    pass: 'spaceCC120'
//                }
//            });
//        
//            var i;
//            for (i = 0; i < mailList.length; i++){
//            var mailOptions = {
//                from: 'Masoud Sadjadi <vipadmin@fiu.edu>', // sender address
//                to: mailList[i], // list of receivers
//                subject: "New Event: " + event.name, // Subject line
//                text: event.message + "\n" + event.month + "/" + event.day + "/" + event.year + "   " + event.hour + ":" + event.minutes
//            };
//            // send mail with defined transport object
//            transporter.sendMail(mailOptions, function(error, info){
//                if(error){
//                    return console.log(error);
//                }
//                console.log('Message sent: ' + info.response);
//            });
//            }
        })

        .get(function(req, res) {
            Event.find(function(err, events) {
                if (err) res.send(err);

                // return the users
                res.json(events);
            });
        })

    apiRouter.delete('/events/:id', function(req, res){
            console.log('delete in first evenRoutes entered ');
        Event.remove({_id: req.params.id}, function(err, event){
            if(err)
                res.send(err);
            res.json({message: 'successfully deleted!'});
        });
    });    
    
    
    
    



    return apiRouter;
};
