var peerEval = require('../models/PeerEvaluation');

module.exports = function(app,express){
	var apiRouter = express.Router();

	apiRouter.route('/peerEval/all')
		.get(function(req,res){
			peerEval.find({}, function(err,data){
				if(err)
					res.send(err);
				res.json(data);
			});
		});
};
