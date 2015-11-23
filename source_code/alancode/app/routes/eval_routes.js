var bodyParser		= require('body-parser');    // get body-parser
var Feedback		= require('../models/feedback');
var Question = require('../models/question');
var PeerEval = require('../models/peerEvaluation');
var config		= require('../../config');



module.exports = function(app, express) 
{

	var apiRouter = express.Router();

	apiRouter.route('/evaluation')

		.post(function(req, res) 
		{
			var evaluation = new Evaluation() ;
			var obj = req.body ;

      for (var i in obj)
      {
        evaluation.answers.push({ question: obj[i].question, answer: obj[i].answer }) ;
        console.log(obj[i]) ;
      }

	  		evaluation.peerID = req.peerID;
			evaluation.studentID = req.studentID;
			evaluation.projectID = req.projectID;
	  
			evaluation.save(function(err) {
				if (err) {
					return res.send(err) ;
				}

				res.json({ message: 'Evaluation Saved!' }) ;
			});
	
		});

  apiRouter.route('/question')
  
    .post(function(req, res)
    {
      var question = new Question() ;
      
      question.question = req.body.question ;
      question.formType = req.body.ft ;
      question.questionType = req.body.qt ;
      question.makeOptional = req.body.mo ;

      question.save(function(err) {
				if (err) {
					return res.send(err) ;
				}

				res.json({ message: 'Feedback Saved!' }) ;
			});
    })
  
    .get(function(req, res) 
    {
      Question.find({formType: 'fb'}, function(err, question)
      {
        if (err) res.send(err) ;
        res.json(question) ;
      });
    });
		
	return apiRouter
};


		
