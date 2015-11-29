/**
 * Created by Chris on 9/30/2015.
 */
var project     = require('../models/project');
var majors      = require('../models/majors');
var config      = require('../../config/config.js');
var shortid     = require('shortid');
var url         = '/projects';

//Add a new project request to the database.
module.exports = function(app, express) {

    var apiRoutes = express.Router();
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
        newProject._id = shortid.generate();

        newProject.save(function (err) {
            if (err) {
                if (err.code == 11000)
                    console.log(err);
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
        project.find({}, function (err, proj) {
            if (err)
                res.send(err);
            res.json(proj);
        });
    });

    apiRoutes.get(url + '/pending/all', function (req, res) {
        //step through every project (proj), in project db and print it.
        project.find({}, function (err, proj) {
            if (err)
                res.send(err);
            res.json(proj);
        });
    });
    /*
     * Search through database for a specific user's pending projects
     * ROUTE: /projects/projects/:email/pending
     * ONLY RETURNS PROJECT NAME
     *   projects.name
     * */
    apiRoutes.get(url + '/:email/pending', function (req, res) {
        project.find({
            email: req.params.email,
            status: false
        }, 'proj',function (err, projects) {
            if (err)
                res.send(err);
            res.json(projects);
        });
    });

    /*
     * Search through database for a specific user's approved projects
     *
     * ROUTE: /projects/projects/:email/approved
     *
     * ONLY RETURNS PROJECT NAME
     *   projects.name
     * */
    apiRoutes.get(url + '/:email/approved', function (req, res) {
        project.find({
            email: req.params.email,
            status: true
        }, 'proj', function (err, projects) {
            if (err)
                res.send(err);
            res.json(projects);
        });
    });

    /*
     * Search through database for a specific user's projects (both pending and approved)
     * ROUTE: /projects/projects/:email/all
     * ONLY RETURNS PROJECT NAME
     *   projects.name
     * */
    apiRoutes.get(url + '/:email/all', function (req, res){
        project.find({email: req.params.email},'proj', function(err, projects){
            if(err)
                res.send(err);
            res.json(projects);
        });
    });
    /*
    * Edit a user's project
    * 0-NOT USED-- for now, waiting on login implementation
    * works in Postman
    * */
    apiRoutes.put(url + '/:user/:id', function(req, res){
        project.findById(req.params.id, function(err, proj){
            if(err) res.send(err);
            /*TODO: add items to edit rest of the body information*/
            if(req.body.status) proj.status = req.body.status;

            proj.save(function(err){
                if(err) res.send(err);
                res.json({message: 'Updated!'});
            })
        });
    });
    /*
    * Update/Edit a Project's information
    * */
    apiRoutes.put(url + '/:id', function(req, res){
        project.findById(req.params.id, function(err, proj){
            console.log(proj);
            console.log(req.body);
            if(err) res.send(err);
            /*TODO: add items to edit rest of the body information*/
            if(req.body.proj) proj.proj = req.body.proj;
            if(req.body.status) proj.status = req.body.status;
            if(req.body.disc) proj.disc = req.body.disc;
            if(req.body.request) proj.request = req.body.request;
            if(req.body.max) proj.max = req.body.max;


            proj.save(function(err){
                if(err) res.send(err);
                res.json({message: 'Updated!'});
                console.log('updated!');
            })
        });
    });

    apiRoutes.get(url + '/:id', function(req, res){
        project.findById(req.params.id, function(err, proj){
            if(err)
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

    apiRoutes.delete(url +'/delete/:id', function(req, res){
        project.remove({_id: req.params.id}, function(err, proj){
            if(err)
                res.send(err);
            res.json({message: 'successfully deleted!'});
        });
    });


    return apiRoutes;
};