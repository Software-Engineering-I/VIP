var Subscriptions      = require('../models/subscriptions'); //or subscribers

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /subscriptions
    // ----------------------------------------------------
    apiRouter.route('/subscribers')
        .post(function(req, res) {
        
            var sub = new Subscriptions();      // create a new instance of the Subscription model
            sub.email = req.body.email;

            sub.save(function(err) {
              if (err)
                  return res.send(err);
              });       

        });


        apiRouter.route('/findsub/:email')
        .get(function(req, res) {
            //find the subscriber with this email
             Subscriptions.findOne({email : req.params.email}, function(err, sub){
                if(err) res.send(err);

                if( sub == null)
                {
                    console.log("Hello from null!")
                    res.json({message: 'Email does not exist.'});
                    return;
                }

                res.json({message: sub['email']});
            });
        });

        apiRouter.route('/deletesub/:email')
            // delete the subscriber with this email
            .delete(function(req, res) {
                // find the user with email
                Subscriptions.findOneAndRemove({ email: req.params.email }, function(err) {
                  if (err) throw err;

                  // we have deleted the user
                  console.log('User deleted!');

                });
            });

        apiRouter.route('/subscriptionList')
        // get all the sub (accessed at GET http://localhost:3000/subapi/subscriptionList)
        .get(function(req, res) {
            Subscriptions.find(function(err, sub) {
                if (err) res.send(err);

                // return the users
                res.json(sub);
            });
        })

        return apiRouter;
};
