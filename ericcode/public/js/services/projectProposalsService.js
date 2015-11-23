/**
 * Created by Lucas on 10/27/2015.
 */
angular.module('projectService', [])

    .factory('Project', function($http) {

        // create a new object
        var projectFactory = {};

        // get a single user
        projectFactory.get = function(id) {
            return $http.get('/proposals/projects/' + id);
        };

        // get all projects
        projectFactory.all = function() {
            return $http.get('/proposals/projects/');
        };

        // create a user
        projectFactory.create = function(userData) {
            return $http.post('/proposals/projects/', userData);
        };

        // update a user
        projectFactory.update = function(id, userData) {
            return $http.put('/proposals/projects/' + id, userData);
        };

        // delete a user
        projectFactory.delete = function(id) {
            return $http.delete('/proposals/projects/' + id);
        };

        // return our entire projectFactory object
        return projectFactory;

    });