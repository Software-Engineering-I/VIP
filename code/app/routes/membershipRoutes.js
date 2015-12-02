// Made by Tom

var Membership       = require('../models/membership');

module.exports = function(app, express) {
    var apiRouter = express.Router();

    // on routes that end in /members
    // ----------------------------------------------------
    apiRouter.get('/members',function(req, res) {
        Membership.find({}, function(err, members) {
            console.log(members);
            if (err) res.send(err);

            // return the members
            res.json(members);
        });
    });
    return apiRouter;
};
