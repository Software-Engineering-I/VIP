angular.module('questionService', [])

    .factory('Question', function($http)
    {
      var questionFactory = {};

      questionFactory.get = function(formData) 
	    {
        return $http.post('/question/questions', formData);
      };
      return questionFactory;
    });
