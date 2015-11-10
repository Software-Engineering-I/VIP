/**
 * Created by Emmanuel on 9/28/2015.
 */

// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var UserSchema = new Schema({
	f_name:     {type: String, required: true},
	m_name:     String,
	l_name:     {type: String, required: true},
	pID:        {type: String, required: true, index: {unique:true}},
	username:   {type: String, required: true, index: {unique:true}},
	password:   {type: String, required: true, select: false},
	email:      {type: String, required: true, index: {unique:true}},
	project:    String,
	cell:       String,
	Rank:       String,
	Major:      String,
	Ethnicity:  String,
	visaStatus: String,
	piApproval: String,
	staffApproval: String
});

// hash the password before the user is saved
UserSchema.pre('save', function(next){
	var user = this;

	// hash the password only if the password has  been changed or user is new
	if(!user.isModified('password')) return next();

	// check if pid exists



	//generate the hash
	bcrypt.hash(user.password, null, null, function(err,hash){

		if(err) return next(err);

		//change the password to the hashed version
		user.password = hash;

		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password){
	var user = this;

	return bcrypt.compareSync(password,user.password);
};

//return the model
module.exports = mongoose.model('UserReg', UserSchema);