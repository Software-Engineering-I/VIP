angular.module('questionControl', ['questionService'])

    .controller('questionController', function(Question) 
    {
	    var vm = this ;	
		
		  vm.tagline = 'Its working!';			

      vm.addQuestion = function()
      {
        vm.processing = true ;

			  Question.get(vm.formData)
				  .success(function(data)
				  {
					  vm.processing = false ;
					  vm.formData = {} ;
					  alert(data.message) ;
				  }) ;
      }		
	
    });
