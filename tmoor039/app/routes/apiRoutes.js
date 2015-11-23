var bodyParser    = require('body-parser');    // get body-parser
var User        = require('../models/user');
var config = require('../../config/config.js');

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
 function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------
    apiRouter.route('/me')
    /*
    |--------------------------------------------------------------------------
    | GET /api/me
    |--------------------------------------------------------------------------
    */
    .get(ensureAuthenticated, function(req, res) {
      User.findById(req.user, function(err, user) {
        res.send(user);
    });
    })

    .put(ensureAuthenticated, function(req, res) {
        User.findById(req.user, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
          }
          user.displayName = req.body.displayName || user.displayName;
          user.email = req.body.email || user.email;
          user.save(function(err) {
              res.status(200).end();
          });
      });
    });
    return apiRouter;
};