//var bodyParser    = require('body-parser');    // get body-parser
var Subscriptions      = require('../models/subscriptions'); //or subscribers

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------
    //apiRouter.route('/subscriptions')
    apiRouter.route('/subscribers')
        .post(function(req, res) {
	
	    console.log("hit============================================\n");
	
            var sub = new Subscriptions();      // create a new instance of the Report model
            sub.email = req.body.email;
            console.log(sub.email);
	    //sub.email = req.email;	
	    //sub.email = req.param('email');

	    console.log("hit============================================\n");

            sub.save(function(err) {
              if (err)
                //return res.send({message: err});
         	      return res.send(err);
	          });       

        });
        return apiRouter;
};
