var peerEval = require('../models/PeerEvaluation');

module.exports = function(app,express){
	var apiRouter = express.Router();

	apiRouter.route('/peerEval')
		.get(function(req,res){
			peerEval.find({}, function(err,peval){
				if(err)
					res.send(err);
				res.json(peval);
			});
		});
};
