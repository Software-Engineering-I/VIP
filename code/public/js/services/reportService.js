angular.module('reportService', [])

    .factory('Report', function($http) {

        // create a new object
        var reportFactory = {};

        // create a user
        reportFactory.create = function(formData) {
            return $http.post('/report/reports/', formData);
        };
        // return our entire reportFactory object
        return reportFactory;

    });