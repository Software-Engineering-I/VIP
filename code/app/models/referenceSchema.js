// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// user schema
var tutorialSchema = new Schema({
	author: 	{type: String, required: true},
	user_story: {type: String, required: true},
	link: 		{type: String, required: true},
	sitemap: 	{type: String, required: true}
});

//return the model
module.exports = mongoose.model('reference', tutorialSchema);