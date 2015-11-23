// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// user schema
var peerEvalSchema = new Schema({
    peerID: 	    {type: String, required: true},
    studentID: 	    {type: String, required: true},
    projectID: 	    {type: String, required: true},
	evaluationID: 	    {type: String, required: true},
	answers: []
});

//return the model
module.exports = mongoose.model('peerEvaluation', peerEvalSchema);