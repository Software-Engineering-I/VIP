/**
 * Created on 10/12/2015.
 */
angular.module('projectServices', []).factory('Projects', ['$http', function($http) {
    var projectFactory = {};

    /*Get all pending projects*/
    projectFactory.all = function(){
        return $http.get('/api/projects/pending')
    };

    /*Create a new project*/
    //TODO: finish angular routing for project creation
    projectFactory.create = function(projData){
        return $http.post('/api/projects/new')
    };

    //TODO: create route for single user's projects

    return projectFactory;
}]);