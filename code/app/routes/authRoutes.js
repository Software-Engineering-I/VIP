var bodyParser    = require('body-parser');    // get body-parser
var User        = require('../models/user');
var userregs      = require('../models/userRegistration');
var config          = require('../../config/config.js');
var request        = require('request');
var moment         = require('moment');
var jwt            = require('jwt-simple');

var passport = {
  userType: String,
  userEmail: String
};


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
    exp: moment().add(14, 'days').unix(),
    type: passport.userType,
    mail: passport.userEmail
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = function(app, express) {

  var apiRouter = express.Router();

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
                var str = profile.email;
                var splitStr = str.split("@");
                if(Array.isArray(splitStr)) {
                    if(splitStr[1].toLowerCase() !== "fiu.edu") {
                        return res.status(500).send({message: 'This is not an FIU mail'});
                    }
                }
                // Step 3b. Create a new user account or return an existing one.
                var user = new User();
                user.google = profile.sub;
                user.email = profile.email;

                userregs.findOne({'email' : profile.email}, function(err, userreg) {
                    passport.userType = userreg.userType;
                    passport.userEmail = userreg.email;

                    var token = createJWT(user);
                    /*console.log(token);
                    console.log(jwt.decode(token, config.TOKEN_SECRET));
                    console.log(userreg.userType);*/
                    res.send({
                      userType: userreg.userType,
                      token: token
                    });
                });
            });
        });
    });
    return apiRouter;
};