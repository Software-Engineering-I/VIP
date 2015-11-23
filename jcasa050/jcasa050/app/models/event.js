
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// event schema
var EventSchema = new Schema({
    date:		{type: Date, required: true, default: Date.now},
	month: 		Number,
	day:		Number,
	hour:		Number,
	name:     	{type: String, required: true},
	message: String
});
module.exports = mongoose.model('Event', EventSchema);