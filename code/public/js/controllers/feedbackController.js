angular.module('feedbackControl', ['feedbackService'])

    .controller('feedbackController', function(Feedback) 
    {
	    var vm = this ;	
		  vm.questions ;

      Feedback.getQuestions()
        .success(function(data)
        {
          vm.questions = data ;
          
        }) ; 

		  vm.addFeedback = function() 
		  {
			  vm.processing = true ;

			  Feedback.createFeedback(vm.questions)
				  .success(function(data)
				  {
					  vm.processing = false ;
					  Feedback.getQuestions()
              .success(function(data)
              {
                vm.questions = data ;
          
              }) ; 
					  alert(data.message) ;
				  }) ;
		  };
					
    });
