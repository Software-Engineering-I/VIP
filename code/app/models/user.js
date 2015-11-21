var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new mongoose.Schema({
	email:	  { type: String, unique: true, lowercase:true },
	password: { type: String, select: false },
	displayName: String,
/*	picture: String,
	facebook: String,
	foursquare: String,*/
	google: String
/*	github: String,
	instagram: String,
	linkeding: String,
	live: String,
	yahoo: String,
	twitter: String,
	twitch: String*/
});

userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();
	}
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(user.password, salt, function(err, hash){
			user.password=hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(password, done){
  bcrypt.compare(password, this.passwowrd, function(err, isMatch){
   done(err, isMatch);
 });
};

module.exports = mongoose.model('User', userSchema);