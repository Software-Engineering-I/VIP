var peerEval = require('../models/peerEvaluation');
var projectEval = require('../models/projectEvaluation');

module.exports = function(app,express){
	var apiRouter = express.Router();

	apiRouter.route('/peer')
		.get(function(req,res){
			peerEval.find(function(err,data){
				if(err)
					res.send(err);
				res.json(data);
			});
		});

	apiRouter.route('/project')
		.get(function(req,res){
			projectEval.find(function(err,data){
				if(err)
					res.send(err);
				res.json(data);
			});
		});
	return apiRouter;
};
