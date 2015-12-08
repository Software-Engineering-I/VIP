angular.module('tutorialService', [])

    .factory('Tutorial', function($http) {

        // create a new object
        var helpFactory = {};

        // create a user
        helpFactory.create = function(formData) {
            return $http.post('/tutorial/links/', formData);
        };

        helpFactory.all = function() {
            return $http.get('/tutorial/links/');
        }
        // return our entire reportFactory object
        return helpFactory;

    });