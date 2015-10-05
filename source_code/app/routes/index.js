/**
 * Created by Chris N on 9/30/2015.
 * Iterates through everything in it's folder, and requires it...
 * Should help simplify server.js routing
 * Separate routing path into different files
 *      eg:
 *          http://localhost:[port]/projects/new -> new-projects.js
 *          http://localhost:[port]/users        -> users.js
 *          etc..
 *
 *
 *
 * just add below line into app.js.
 *
 * require('./app/routes')(app);
 *
 *
 */
var fs = require('fs');

module.exports = function(app){
    //using a asynchronous call, synchronous(readdrSync) blocks until done? idk how to javascript well
    fs.readdir(__dirname, function(err, files){
        if(err)
            throw err;
        files.forEach(function(file){
            if (file.substr(file.lastIndexOf('.') + 1) !== 'js' || file === "index.js") {
                return;
            }
            var fileName = file.substr(0, file.indexOf('.'));
            require('./' + fileName)(app);//require everything in this directory
        })
    });
}