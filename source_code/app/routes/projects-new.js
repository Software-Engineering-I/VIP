/**
 * Created by Chris on 9/30/2015.
 *
 * Use postman to test this out for now. See documents on drive for usage.
 */
var project     = require('../models/project');
var url         = '/projects/new'

//Add a new project request to the database.
module.exports = function(app) {

    app.post(url, function (req, res) {
        var newProject    = new project();

        newProject.proj    = req.body.proj;
        newProject.user    = req.body.user;
        newProject.email   = req.body.email;
        newProject.disc    = req.body.disc;
        newProject.request = req.body.requested;
        newProject.max     = req.body.maxwanted;

        newProject.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({success: false, message: 'Project already exists with that name'});
                else
                    return res.send(err);
            }
            res.json({message: "Project creation successful"});
        });
    })

    app.get(url, function (req, res) {
        res.json({message: "GET: " + url});
    })

}