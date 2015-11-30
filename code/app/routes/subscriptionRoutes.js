var Subscriptions      = require('../models/subscriptions'); //or subscribers

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /subscriptions
    // ----------------------------------------------------
    apiRouter.route('/subscribers')
        .post(function(req, res) {
		
            var sub = new Subscriptions();      // create a new instance of the Subscription model
            sub.email = req.body.email;
            console.log(sub.email);

            sub.save(function(err) {
              if (err)
         	      return res.send(err);
	          });       

        });

        apiRouter.route('/findsub/:email')
        .get(function(req, res) {

            Subscriptions.findOne({'email' : new RegExp(req.params.email, 'i')}, function(err, sub){
                if(err) res.send(err);
                if( sub == null)
                {
                    console.log("Hello from null!")
                    res.json({message: 'Email does not exist.'});
                    return;
                }
                res.json({message: sub.email});

            });
        });

        apiRouter.route('/deletesub/:email')
        // delete the subscriber with this email
        .delete(function(req, res) {
            Subscriptions.findOneAndRemove({'email' : new RegExp(req.params.email, 'i')}, function(err, sub){
                if(err) res.send(err);
                if( sub == null)
                {
                    console.log("Hello from null!")
                    res.json({message: 'Email does not exist.'});
                    return;
                }
                res.json({message: sub.email});

            });
        })

        return apiRouter;
};
