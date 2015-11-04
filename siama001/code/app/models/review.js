// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// user schema
var reviewSchema = new Schema({
	ProjetID: 	{type: String, required: true},
	fpid: {type: String, required: true},
	tpid: {type: String, required:true},
	comments: {type: String, required: true}
});

//return the model
module.exports = mongoose.model('Review', reviewSchema);
