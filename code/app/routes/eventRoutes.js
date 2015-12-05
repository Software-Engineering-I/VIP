
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

//        console.log('here');
            var e = new Date(req.body.date);
            var t = new Date(req.body.datetime);
//        console.log(e);
            event.year = e.getFullYear();
//        console.log(event.year);
            event.month = e.getMonth()+1;
            event.day = e.getDate();
            event.hour = t.getHours();
//        console.log(event.hour);
            event.minutes = t.getMinutes();
//        console.log(event.minutes);
            event.date = new Date(event.year,(event.month-1),event.day,event.hour,event.minutes,0,0);
//        console.log(event.date);
        
            var today = new Date();
            if(event.date < today){
                return res.json({message: 'Event date is before today'});
            }

            // save the event and check for errors
            event.save(function(err) {
                if (err) {
                        return res.send(err);
                }

                res.json({ message: 'Event created!' });
                console.log('event created');
            });
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
