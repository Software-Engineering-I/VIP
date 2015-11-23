var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new mongoose.Schema({
	f_name:     {type: String, required: true},
	m_name:     String,
	l_name:     {type: String, required: true},
	//pID:        {type: String, required: true, index: {unique:true}},
	username:   {type: String, required: true, index: {unique:true}},
	displayName:	String,
	//password:   {type: String, select: false},
	//passconf:	String,
	email:      {type: String, required: true, index: {unique:true}},
	project:    String,
	userType:	String,		//PendingStudent, Student, PendingFaculty,PendingFacultyForPI, Faculty, PendingPI/CoPI,PendingPi/CoPIForPI, PI/CoPI, Staff, PendingStaff, PendingStaffForPI
	currentProject: String,
	picture:	String,			//Google Picture.
	Department:	String,
	google:		 String,
	//Manny Fields, Garrett Needs to ensure his field is the same, or rename his.
	piApproval:	String,
	staffApproval:	String,

	//Field for faculty comment - implemented by Garrett Lemieux
	facComment: String,

	/*
	 THESE FIELDS ARE FORE A USER 'RESUME'
	 NONE OF THESE FIELDS ARE REQUIRED!
	 -Implemented by Tiago Moore
	 */
	visaStatus:	String,
	sex:		String,
	major:      String,
	ethnicity:  String,
	race:       String,
	cell:       String,
	year:       String,
	placeOfBirth: String,
	userSummary: String,
	school: 			String,
	creditsCompleted: String,
	major:					String,
	gpa:							String,
	degreeType:      String,
	degreeCompletionStatus: 	  String,
	relevantCourses:	String,
	workCompany:			String,
	workPosition:	  String,
	workTime:				String,
	workStatus:      String,
	workSummary:			String,
	workHighlights: 	String,
	skills:					String,
	volunteerOrganization: String,
	volunteerPosition:	String,
	volunteerTime: 		String,
	volunteerWebsite: String,
	volunteerSummary:	String,
	volunteerHighlights: String,
	interestList: 		String,
	firstReferenceName:	String,
	firtReferenceEmail: String,
	firstReferenceNotes:	String,
	secondReferenceName:	String,
	secondReferenceEmail:	String,
	secondReferenceNotes: String





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