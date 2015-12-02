angular.module('questionService', [])

    .factory('Question', function($http)
    {
      var questionFactory = {};

      questionFactory.create = function(formData) 
	    {
        return $http.post('/question/questions', formData);
      };
      return questionFactory;
    });
