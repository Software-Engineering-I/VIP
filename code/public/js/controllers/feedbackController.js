angular.module('feedbackControl', ['feedbackService'])

    .controller('feedbackController', function(Feedback) 
    {
	    var vm = this ;	
		  vm.questions ;
      vm.sb = [] ;
      vm.tf = [] ;
      vm.sa = [] ;
    
		  vm.tagline = 'Its working!';

      Feedback.get()
        .success(function(data)
        {
          vm.questions = data ;
          
        }) ; 

		  vm.addFeedback = function() 
		  {
			  vm.processing = true ;

			  Feedback.update(vm.questions)
				  .success(function(data)
				  {
					  vm.processing = false ;
					  Feedback.get()
              .success(function(data)
              {
                vm.questions = data ;
          
              }) ; 
					  alert(data.message) ;
				  }) ;
		  };
					
    });
