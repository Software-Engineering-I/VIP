angular.module('evalService', [])

    .factory('Evaluation', function($http)
    {
      var evalFactory = {};

      evalFactory.update = function(formData) 
	    {
        return $http.post('/eval/evals', formData);
      };

      evalFactory.get = function()
      {
        return $http.get('/api/questions') ;
      };
      return evalFactory;
    });
