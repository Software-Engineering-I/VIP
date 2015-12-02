var bodyParser		= require('body-parser');    // get body-parser
var Feedback = require('../models/feedback');

module.exports = function(app, express) 
{

	var apiRouter = express.Router();

  apiRouter.route('/feedbacks')

    .post(function(req, res) 
		{
			var f = new Feedback() ;
      var obj = req.body ;
      
      for (var i in obj)
      {
        f.feedback.push({ question: obj[i].question, answer: obj[i].answer }) ;
      }

			f.save(function(err) {
				if (err) {
					return res.send(err) ;
				}

				res.json({ message: 'Feedback Saved!' }) ;
			});
	
		});
  

  return apiRouter
};
