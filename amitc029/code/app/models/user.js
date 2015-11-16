var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new mongoose.Schema({
	f_name:     {type: String, required: true},
	m_name:     String,
	l_name:     {type: String, required: true},
	//pID:        {type: String, required: true, index: {unique:true}},
	username:   {type: String, required: true, index: {unique:true}},
	//password:   {type: String, select: false},
	//passconf:	String,
	email:      {type: String, required: true, index: {unique:true}},
	project:    String,
	cell:       String,
	Rank:       String,
	College:	String,
	Major:      String,
	Ethnicity:  String,
	Sex:		String,
	visaStatus:	String,
	userType:	String,		//PendingStudent, Student, PendingFaculty,PendingFacultyForPI, Faculty, PendingPI/CoPI,PendingPi/CoPIForPI, PI/CoPI, Staff, PendingStaff, PendingStaffForPI
	currentProject: String,
	picture:	String,			//Google Picture.
	Department:	String,
	google:		 String


},{versionKey : false});
/*
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
*/
module.exports = mongoose.model('User', userSchema);