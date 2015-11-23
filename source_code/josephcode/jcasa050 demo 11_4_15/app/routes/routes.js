
var Event      = require('../models/event');
var config     = require('../../config');
var nodemailer = require('nodemailer');


module.exports = function(app, express) {
    var apiRouter = express.Router();
    var mailList = ["jcasa050@fiu.edu"];
    
    apiRouter.route('/events')

        .post(function(req, res) {

            // create a new instance of the event model
            var event = new Event();

            // set the event information (comes from the request)
//            var mydate = new Date(req.body.date);
//            var today = new Date();
//            if(mydate < today){
//                return res.json({message: 'Event date is before today'});
//            }
            event.name = req.body.name;
            event.message = req.body.message;
//            event.date = new Date();
//            event.date = new Date(req.body.date);
        
//            event.month     = mydate.getMonth() + 1;
//            event.day     = mydate.getDate();
//            event.hour     = mydate.getHours();
//            event.minutes  = mydate.getMinutes();
        
            var ampm        =req.body.ampm;
            var m = req.body.month;
            console.log(m);
            if(m.localeCompare("January") == 0)
                event.month = 1;
            else if(m.localeCompare("February") == 0)
                event.month = 2;
            else if(m.localeCompare("March") == 0)
                event.month = 3;
            else if(m.localeCompare("April") == 0)
                event.month = 4;
            else if(m.localeCompare("May") == 0)
                event.month = 5;
            else if(m.localeCompare("June") == 0)
                event.month = 6;
            else if(m.localeCompare("July") == 0)
                event.month = 7;
            else if(m.localeCompare("August") == 0)
                event.month = 8;
            else if(m.localeCompare("September") == 0)
                event.month = 9;
            else if(m.localeCompare("October") == 0)
                event.month = 10;
            else if(m.localeCompare("November") == 0)
                event.month = 11;
            else if(m.localeCompare("December") == 0)
                event.month = 12;
            else
                res.json({ message: 'Month error' });
//            event.month     = req.body.month;
            event.day     = req.body.day;
            event.year     = req.body.year;
        
            var hour = parseInt(req.body.hour);
            var x = 12;
            var z = hour+x;
        console.log(z);
            if(ampm.localeCompare("pm") == 0)
                event.hour     = z;
            else
                event.hour     = hour;
        
//            event.hour     = req.body.hour;
            event.minutes     = req.body.minutes;

            // save the event and check for errors
            mailList[mailList.length] = req.body.email;
            event.save(function(err) {
                if (err) {
                    console.log('here');
                        return res.send(err);
                }

                res.json({ message: 'Event created!' });
                console.log('event created');
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
        
            var i;
            for (i = 0; i < mailList.length; i++){
            var mailOptions = {
                from: 'Masoud Sadjadi <vipadmin@fiu.edu>', // sender address
                to: mailList[i], // list of receivers
                subject: 'New Event', // Subject line
                text: " A new event has been created!"
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

        .get(function(req, res) {
            Event.find(function(err, events) {
                if (err) res.send(err);

                // return the users
                res.json(events);
            });
        })

        .delete(function(req, res) {
            Event.remove({
                _id: req.body.id
            }, function(err, event) {
                if (err) return res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        });
    
    
    



    return apiRouter;
};
