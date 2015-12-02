var bodyParser		= require('body-parser');    // get body-parser
var Question = require('../models/question');

module.exports = function(app, express) 
{

	var apiRouter = express.Router();

  apiRouter.route('/questions')
  
    .post(function(req, res)
    {
      var question = new Question() ;
      
      question.question = req.body.question ;
      question.formType = req.body.ft ;
      question.questionType = req.body.qt ;

      question.save(function(err) {
				if (err) {
					return res.send(err) ;
				}

				res.json({ message: 'Question Saved!' }) ;
			});
    })
  
    .get(function(req, res) 
    {
      Question.find(function(err, question)
      {
        if (err) res.send(err) ;
        res.json(question) ;
      });
    });

  apiRouter.route('/questions/:formType')

  .get(function(req, res)
  {
    Question.find({formType: req.params.formType}, function(err, question)
    {
      if (err) res.send(err) ;
      res.json(question) ;
    });
  });

  return apiRouter
};
