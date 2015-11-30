/**
 * Created on 10/12/2015.
 */
angular.module('projectServices', []).factory('Projects', ['$http', function($http) {
    var projectFactory = {};

    /*Get all pending projects*/
    projectFactory.all = function(){
        return $http.get('/projects/projects/pending')
    };

    /*get all projects*/
    projectFactory.all = function(){
        return $http.get('/projects/projects')
    };


    /*Create a new project*/
    projectFactory.create = function(projData){
        console.log("service rec: ", projData);
        return $http.post('/projects/projects/new', projData);
    };

    projectFactory.delete = function(id){
        return $http.delete('/projects/projects/delete/' + id);
    }

    //TODO: create route for single user's projects
    /*TODO: create route to edit a project*/
    projectFactory.get = function(id){
        console.log("service req: ", id);
        return $http.get('/projects/projects/' + id);
    }

    projectFactory.update = function(id, projectData){
        console.log("service req: ", id);
        return $http.put('/projects/projects/' + id, projectData);
    }
    return projectFactory;
}]);