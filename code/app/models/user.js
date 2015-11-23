

// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// user schema
var UserSchema = new Schema({
	field:      {type: String, required: true},
	team:       {type: String, required: true},
	f_name:     {type: String, required: true},
	t_name:     {type: String, required: true},
	item1:      String, 
	item1_c:    String, 
	item2:      String, 
	item2_c:    String, 
	item3:      String, 
	item3_c:    String,
	item4:      String,
	item4_c:    String,
	item5:      String,
	item5_c:    String,
    item6:      String,
    item6_c:    String,
    item7:      String
});

// hash the password before the user is saved
UserSchema.pre('save', function(next){
		next();

});

//return the model
module.exports = mongoose.model('User', UserSchema);
