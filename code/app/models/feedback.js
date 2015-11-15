// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
	answers: []
});

module.exports = mongoose.model('Feedback', FeedbackSchema) ;
