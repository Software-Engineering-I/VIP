// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// user schema
var peerEvalSchema = new Schema({
    peerID: 	    {type: String},
    studentID: 	    {type: String},
    projectID: 	    {type: String},
	evaluationID: 	    {type: String},
	answers: []
});

//return the model
module.exports = mongoose.model('peerEvaluation', peerEvalSchema);