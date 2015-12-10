angular.module('reportService', [])

    .factory('Report', function($http) {

        // create a new object
        var reportFactory = {};

        // create a user
        reportFactory.create = function(formData) {
            return $http.post('/report/reports/', formData);
        };

        reportFactory.get = function() {
            return $http.get('/report/reports/');
        };
        // return our entire reportFactory object
        return reportFactory;

    });