angular.module('feedbackService', [])

    .factory('Feedback', function($http)
    {
      var feedbackFactory = {};

      feedbackFactory.update = function(formData) 
	    {
        return $http.post('/feedback/feedbacks', formData);
      };

      feedbackFactory.get = function()
      {
        return $http.get('/question/questions/fb') ;
      };
      return feedbackFactory;
    });
