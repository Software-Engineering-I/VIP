// Made by Tom

// grab the packages that we need for the membership model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// membership schema
var MembershipSchema = new Schema({
	f_name:     {type: String, required: true},
	l_name:     {type: String, required: true},
	rank:       String,
	project:    String,
	team: 		String
});

//return the model
module.exports = mongoose.model('members', MembershipSchema);