angular.module('questionService', [])

    .factory('Question', function($http)
    {
      var questionFactory = {};

      questionFactory.get = function(formData) 
	    {
        return $http.post('/api/question', formData);
      };
      return questionFactory;
    });
