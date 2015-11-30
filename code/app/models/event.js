
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// event schema
var EventSchema = new Schema({
    date:		{type: Date},
	month: 		Number,
	day:		Number,
    year:       Number,
	hour:		Number,
    minutes:    Number,
	name:     	{type: String, required: true},
	message: String
});
module.exports = mongoose.model('Event', EventSchema);