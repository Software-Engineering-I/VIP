//var bodyParser    = require('body-parser');    // get body-parser
var Subscriptions      = require('../models/subscriptions'); //or subscribers

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------
    apiRouter.route('/subscriptions')
        .post(function(req, res) {

            var sub = new Subscriptions();      // create a new instance of the Report model
            sub.email = req.body.email;

            sub.save(function(err) {
              if (err)
                return res.send({message: err});
            });       

        });
        return apiRouter;
};
