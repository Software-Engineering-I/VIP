angular.module('questionControl', ['questionService'])

    .controller('questionController', function(Question) 
    {
	    var vm = this ;			

      vm.addQuestion = function()
      {
        vm.processing = true ;

			  Question.create(vm.formData)
				  .success(function(data)
				  {
					  vm.processing = false ;
					  vm.formData = {} ;
					  alert(data.message) ;
				  }) ;
      }		
	
    });
