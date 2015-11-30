// grab the packages that we need for the subscription model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Subscription schema
var SubscriptionSchema = new Schema({
	email: 		String
});

//return the model
module.exports = mongoose.model('Subscriptions', SubscriptionSchema);
