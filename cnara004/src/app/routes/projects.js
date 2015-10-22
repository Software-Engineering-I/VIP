/**
 * Created by Chris on 9/30/2015.
 */
var project     = require('../models/project');
var config      = require('../../config.js');
var url         = '/projects';

//Add a new project request to the database.
module.exports = function(app, apiRoutes) {

    /*
    * Add a new project to database
    * ROUTE: /projects/new
    * */
    apiRoutes.post(url + '/new', function (req, res) {
        var newProject    = new project();

        newProject.proj    = req.body.proj;
        newProject.user    = req.body.user;
        newProject.email   = req.body.email;
        newProject.disc    = req.body.disc;
        newProject.request = req.body.request;
        newProject.max     = req.body.max;

        newProject.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({
                        success: false,
                        message: 'Project already exists with that name'
                    });
                if(err.errors.kind == "required")
                    return res.json({
                        success: false,
                        message: 'Form is not filled out correctly'
                    });
                else
                    return res.send(err);
            }
            res.json({
                success: true,
                message: 'Project creation successful'
            });
        });
    });

    /*apiRoutes.get(url, function (req, res) {
        res.json({message: "GET: " + url});
    });*/

    /*
    * Search through database for (ALL - need to change for specific user's) pending projects
    * ROUTE: projects/pending
    * */
    apiRoutes.get(url + '/pending', function (req, res) {
        //step through every project (proj), in project db and print it.
        project.find({status: false}, function (err, proj) {
            if (err)
                res.send(err);
            res.json(proj);
        });
    });
    /*
     * Search through database for a specific user's pending projects
     * ROUTE: projects/:user_name/pending/
     * */

    apiRoutes.get(url + '/:user/pending/', function (req, res) {
        //step through every project (proj), in project db and print it.
        project.find({user: req.params.user}, function (err, proj) {
            if (err)
                res.send(err);
            res.json(proj);
        });
    });

    /*
     * View approved projects
     * ROUTE: projects/approved
     * */
    apiRoutes.get(url + '/approved', function(req, res){
        project.find({status: true}, function (err, proj){
            if(err)
                res.send(err);
            res.json(proj);
        })
    });
};