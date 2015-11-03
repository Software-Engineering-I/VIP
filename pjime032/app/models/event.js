/**
 * Created by Pierre on 10/29/2015.
 */

// grab the packages that we need for the event model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Event   = mongoose.Schema;

// Event schema
var EventSchema = new Schema({
	date:		{type: Date, required: true, default: Date.now},
	month: 		Number,
	day:		Number,
	hour:		Number,
	eName:     	{type: String, required: true},
	description: String
});

//return the model
module.exports = mongoose.model('Event', EventSchema);