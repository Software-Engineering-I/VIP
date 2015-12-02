angular.module('evalService', [])

    .factory('Evaluation', function($http)
    {
        var evaluationFactory = {};

        evaluationFactory.update = function(formData)
        {
            return $http.post('/evaluation/evaluations', formData);     //Going to check this route for post!
        };

        evaluationFactory.get = function()
        {
            return $http.get('/question/questions/pe') ;
        };
        return evaluationFactory;
    });