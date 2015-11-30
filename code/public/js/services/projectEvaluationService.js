angular.module('projectEvaluationService', [])

    .factory('Evaluation', function($http) {

        // create a new object
        var projectEvaluationFactory = {};

        // create a user
        projectEvaluationFactory.create = function(feedback) {
            return $http.post('/projectEvaluation/projectEvaluations/', feedback);
        };
        // return our entire reportFactory object
        return projectEvaluationFactory;

    });