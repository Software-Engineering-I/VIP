angular.module('feedbackService', [])

    .factory('Feedback', function($http)
    {
      var factory = {};

      factory.createFeedback = function(formData) 
	    {
        return $http.post('/feedback/feedbacks', formData);
      };

      factory.getQuestions = function()
      {
        return $http.get('/question/questions/fb') ;
      };
      return factory;
    });
