angular.module('helpService', [])

    .factory('Tutorials', function($http) {

        var serviceFactory = {};

        serviceFactory.createTuts = function(formData) {
            return $http.post('/help/tutorials/', formData);
        };

        serviceFactory.allTuts = function() {
            return $http.get('/help/tutorials/');
        }

        return serviceFactory;

    })

    .factory('Reference', function($http) {

        var serviceFactory = {};

        serviceFactory.createRefs = function(formData) {
            return $http.post('/help/references/', formData);
        };

        serviceFactory.allRefs = function() {
            return $http.get('/help/references/');
        }

        return serviceFactory;

    });