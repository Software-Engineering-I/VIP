var bodyParser    = require('body-parser');    // get body-parser
var User        = require('../models/user');
var config = require('../../config/config.js');
var request        = require('request');
var moment         = require('moment');
var jwt            = require('jwt-simple');

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

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
 function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------

    apiRouter.route('/login')
    .post(function(req, res) {
      User.findOne({ email: req.body.email }, '+password', function(err, user) {
        if (!user) {
          return res.status(401).send({ message: 'Wrong email and/or password' });
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({ message: 'Wrong email and/or password' });
          }
          res.send({ token: createJWT(user) });
        });
      });
    });

    apiRouter.route('/signup')
    .post(function(req, res) {
      User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
          return res.status(409).send({ message: 'Email is already taken' });
        }
        var user = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password
        });
        user.save(function() {
          res.send({ token: createJWT(user) });
        });
      });
    });

    apiRouter.route('/google')
    .post(function(req, res) {
      var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
      var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
      }

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      //Output the logged-in user information
      //Perform @fiu.edu authentication:
      console.log(profile);
      var str = profile.email;
      var splitStr = str.split("@");
      if(Array.isArray(splitStr)) {
        if(splitStr[1].toLowerCase() !== "fiu.edu") {
         return res.status(500).send({message: 'This is not an FIU mail'});
       }
     }

      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        User.findOne({ google: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.google = profile.sub;
            user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ google: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.send({ token: createJWT(existingUser) });
          }
          var user = new User();
          user.google = profile.sub;
          user.picture = profile.picture.replace('sz=50', 'sz=200');
          user.displayName = profile.name;
          user.save(function(err) {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
});
});



apiRouter.route('/unlink')
.post(ensureAuthenticated, function(req, res) {
  var provider = req.body.provider;
  var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
  'linkedin', 'live', 'twitter', 'twitch', 'yahoo'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send({ message: 'Unknown OAuth Provider' });
  }

  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User Not Found' });
    }
    user[provider] = undefined;
    user.save(function() {
      res.status(200).end();
    });
  });
});
return apiRouter;
};