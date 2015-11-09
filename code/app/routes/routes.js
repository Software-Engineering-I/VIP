var bodyParser		= require('body-parser');    // get body-parser
var Report			= require('../models/report');

module.exports = function(app, express) {

	var apiRouter = express.Router();

    // on routes that end in /reports
    // ----------------------------------------------------
    apiRouter.route('/reports')
        .post(function(req, res) {

            var report = new Report();      // create a new instance of the Report model
            report.question1		= req.body.question1;
            report.question2		= req.body.question2;
            report.question3		= req.body.question3;
            report.question4		= req.body.question4;
            report.question5		= req.body.question5;
            report.question6		= req.body.question6;
            report.question7		= req.body.question7;
            report.question8		= req.body.question8;
            report.question9		= req.body.question9;
            report.question10		= req.body.question10;
            report.question11		= req.body.question11;

            report.save(function(err) {
            	if (err)
            		return res.send({message: err});

                // return a message
                res.json({ message: 'Report created!' });
            });       

        });
        return apiRouter;
};