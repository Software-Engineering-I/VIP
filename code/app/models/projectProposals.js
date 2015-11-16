
var mongoose    = require('mongoose');
var schema      = mongoose.Schema;
var shortid     = require('shortid');

var Project = new schema({
    proj: {type: String, required: true},
    proj_body: {type:String, required: true},
    comment: {type: String, required: false},
    user: {type: String, required: true},
    email: {type: String, required: true},
    disc: [{
        major: {type: String}
    }],
    request: {type: Number, required: false, min: 1},
    max: {type: Number, required: false},
    status: {type: Boolean, default: false},
    /*  install shortid for this..
     npm install shortid
     */
    _id: {type: String, index: {unique: true}, default: shortid.generate()}
});

module.exports = mongoose.model('Project', Project);


/*
proj   -> project name
user  -> user who created project
email -> email for user
disc   -> array of majors project is for
request -> number of students requested to work on this
max -> max students for this project
status -> approval status(accept/reject)
*/
