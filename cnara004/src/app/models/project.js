/**
 * Created by narac on 9/30/2015.
 */
var mongoose    = require('mongoose');
var schema      = mongoose.Schema;
var shortid     = require('shortid');

var Project = new schema({
    proj: {type: String, required: true},
    user: {type: String, required: true},
    email: {type: String, required: true},
    disc: {type: String, required: true},
    request: {type: Number, required: true, min: 1},
    max: {type: Number, required: true},
    status: {type: Boolean, default: false},
    _id: {type: String, index: {unique: true}, default: shortid.generate()}
    //I need to add some project id, would be easier to track/manage by unique ID number.
});

module.exports = mongoose.model('Project', Project);