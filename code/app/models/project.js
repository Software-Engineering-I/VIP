/**
 * Created by narac on 9/30/2015.
 */
var mongoose    = require('mongoose');
var schema      = mongoose.Schema;
var shortid     = require('shortid');

var Project = new schema({
    proj: {type: String, required: true},
    proj_body: {type:String, required: false}, //added for Lucas part
    comment: {type: String, required: false}, //added for Lucas part
    user: {type: String, required: true},
    email: {type: String, required: true},
    /*TODO: change type to [String] (array of strings)*/
    /*TODO: array of objects?*/
    /*disc: {type: String, required: true},*/
    disc: [{
        type: String
    }],
    request: {type: Number, required: true, min: 1},
    max: {type: Number, required: true},
    status: {type: Boolean, default: false},
    /*  install shortid for this..
        npm install shortid
        */
    _id: {type: String, index: {unique: true}, default: shortid.generate()}
});

module.exports = mongoose.model('Project', Project);