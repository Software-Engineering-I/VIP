var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	question: {type: String},
	formType: {type: String},
	questionType: {type: String}
});

module.exports = mongoose.model('Question', QuestionSchema) ;
