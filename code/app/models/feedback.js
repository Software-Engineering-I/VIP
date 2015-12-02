// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
	feedback: []
});

module.exports = mongoose.model('Feedback', FeedbackSchema) ;
