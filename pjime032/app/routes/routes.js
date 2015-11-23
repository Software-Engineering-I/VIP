var bodyParser = require('body-parser'); 	// get body-parser
var Event       = require('../models/event');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {
    var apiRouter = express.Router();


    // test route to make sure everything is working
    // accessed at GET http://localhost:8080/api
    apiRouter.get('/', function(req, res) {
        console.log("Visited root")
    });

    // on routes that end in /events
    // ----------------------------------------------------
    apiRouter.route('/events')


        // create an event (accessed at POST http://localhost:8080/users)
        .post(function(req, res) {

            var event = new Event();		// create a new instance of the User model
            var mydate = new Date(req.body.date);
            event.date     = new Date(req.body.date);  // set the users date (comes from the request)
            event.eName     = req.body.eName;  // set the event name
            event.description     = req.body.description;  // set the event description
            event.month     = mydate.getMonth() + 1;
            event.day     = mydate.getDate();
            event.hour     = mydate.getHours();

            event.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'An event with that event name already exists. '});
                    else
                        return res.send(err);

                }

                // return a message

                res.json({ message: 'Event created!' });
            });

        })

        // get all the users (accessed at GET http://localhost:8080/api/events)
        .get(function(req, res) {

            Event.find({}, function(err, events) {
                if (err) res.send(err);

                // return the events
                res.json(events);
            });
        });

    // on routes that end in /events/:event_id
    // ----------------------------------------------------
    apiRouter.route('/events/:event_id')

        // get the event with that id
        .get(function(req, res) {
            Event.findById(req.params.event_id, function(err, event) {
                if (err) res.send(err);

                // return that user
                res.json(event);
            });
        })

        // delete the event with this id
        .delete(function(req, res) {
            Event.remove({
                _id: req.params.event_id
            }, function(err, event) {
                if (err) res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        res.send(req.decoded);
    });

    return apiRouter;
};
