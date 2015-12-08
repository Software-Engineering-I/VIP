var bodyParser    = require('body-parser');    // get body-parser
var Tutorials      = require('../models/tutorialSchema');
var Reference      = require('../models/referenceSchema');

module.exports = function(app, express) {

  var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------
    apiRouter.route('/tutorials')
        .post(function (req, res) {

            var tutorial = new Tutorials();      // create a new instance of the Report model
            tutorial.author         = req.body.author;
            tutorial.user_story     = req.body.user_story;
            tutorial.link           = req.body.link;
            tutorial.sitemap        = req.body.sitemap;

            tutorial.save(function(err) {
              if (err)
                return res.send({message: err});

                // return a message
                res.json({ message: 'tutorial created!' });
            });       

        })
        
        .get(function(req, res) {
            var tutorial = new Tutorials();
            Tutorials.find(function (err, tutorials) {
                if(err)
                    res.send(err);

                res.json(tutorials);
            });
        });

        apiRouter.route('/references')
        .post(function (req, res) {

            var references = new Reference();      // create a new instance of the Report model
            references.author         = req.body.author;
            references.user_story     = req.body.user_story;
            references.link           = req.body.link;
            references.sitemap        = req.body.sitemap;

            references.save(function(err) {
              if (err)
                return res.send({message: err});

                // return a message
                res.json({ message: 'references created!' });
            });       

        })
        
        .get(function(req, res) {
            var references = new Reference();
            Reference.find(function (err, references) {
                if(err)
                    res.send(err);

                res.json(references);
            });
        });
        return apiRouter;
};