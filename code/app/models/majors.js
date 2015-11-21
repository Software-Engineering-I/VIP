var mongoose    = require('mongoose');
var schema      = mongoose.Schema;

var Majors = new schema({
    majors: {type: String}
});

module.exports = mongoose.model('Majors', Majors);