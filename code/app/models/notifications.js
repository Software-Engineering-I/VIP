
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// notifications schema
var NotificationsSchema = new Schema({
	message:       {type: String, required: true},
	id:            {type: String, required: true}
});
module.exports = mongoose.model('Notifications', NotificationsSchema);