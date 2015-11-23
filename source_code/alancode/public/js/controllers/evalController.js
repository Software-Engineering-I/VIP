angular.module('evalControl', ['evalService'])

    .controller('evalController', function(Evaluation) 
    {
	    var vm = this ;	
		  vm.questions ;
      vm.sb = [] ;
      vm.tf = [] ;
      vm.sa = [] ;
    
		  vm.tagline = 'Its working!';

      Evaluation.get()
        .success(function(data)
        {
          vm.questions = data ;
          
        }) ; 

		  vm.addEvaluation = function() 
		  {
			  vm.processing = true ;

			  Evaluation.update(vm.questions)
				  .success(function(data)
				  {
					  vm.processing = false ;
					  Evaluation.get()
              .success(function(data)
              {
                vm.questions = data ;
          
              }) ; 
					  alert(data.message) ;
				  }) ;
		  };
					
    });
