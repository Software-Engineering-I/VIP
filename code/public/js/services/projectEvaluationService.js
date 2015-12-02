angular.module('projectEvaluationService', [])

    .factory('Evaluations', function($http) {

        // create a new object
        var projectEvaluationFactory = {};

        // create an evaluation
        projectEvaluationFactory.create = function(feedback) {
            return $http.post('/projectEvaluation/projectEvaluations/', feedback);
        };
        // return our entire projectEvaluationFactory object
        return projectEvaluationFactory;

    });