angular.module('evalDisplayControl', ['userService'])


.controller('evaluationsDisplayController', function(User, $scope) {

       var vm = this;
	   vm.repeatSelect = "";
       vm.master = "";	
	   vm.header = "";	
	   $scope.table = false;
	   $scope.evaluation = false;
	
        vm.accessEvaluation = function(name) 
	    {
		   vm.master = angular.copy(name);
		   vm.header = "All Peer Evaluations For";
		  
		};
	
		$scope.display = function() 
		{
			$scope.table = true;
			$scope.evaluation = false;
		};
	
	    $scope.accessProjects = function() 
		{
			$scope.table = false;
			$scope.evaluation = true;
		};
	
        // set a processing variable to show loading things
        vm.processing = true;

        // grab all the users at page load
        // "User" refers to userService factory object
        User.all()
            .success(function(data) {

                // when all the users come back, remove the processing variable
                vm.processing = false;

                // bind the users that come back to vm.users
                vm.users = data;
            });

		
           vm.updateProject = function(id,project) {
            console.log("being executed here")
            // call change project from User Service and give it id and optionally a project
            User.changeProject(id,project)

                // if the function succeeds repopulate table with new changes
                .success(function (data){

                    // call function to repopulate table
                    User.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.users = data;
                        });
                })
        };
	
	    		 
	  // The following entries were hardcoded due to lack of adequate data to be extracted
	  $scope.questions = [{   q1: 'Participates in team meetings', 
							  q2: 'Contributes to the progress of the project', 
							  q3: 'Communicates ideas to the team',
							  q4: 'Respectful of the ideas of others',
							  q5: 'Facilitates the progress of the group',
							  q6: 'Comments',
						      cc: 'Not Applicable if this Student is the Only Member of the Team'
						   }];
	
	    $scope.studentList = [
		      {   name: 'Garrett', 				
		          evaluations: [
		            {ans1: '3', ans2: '3', ans3: '4', ans4: '3', ans5: '5', comment: 'Great teammate!'},
		            {ans1: '3', ans2: '4', ans3: '5', ans4: '2', ans5: '5', comment: 'Ok'}
		          ]
		      },
		      
		      {   name: 'Sean', 				
		          evaluations: [
		            {ans1: '2', ans2: '5', ans3: '4', ans4: '4', ans5: '3', comment: 'No comments'},
		            {ans1: '5', ans2: '1', ans3: '2', ans4: '2', ans5: '3', comment: 'Good worker'}
		          ]
		      },
		      
		      {   name: 'T', 				
		          evaluations: [
		            {ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '4', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: 'Nice'}
		          ]
		      },
			 
			  {   name: 'Eric', 				
		          evaluations: [
		            {ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '1', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: 'Works well'}
		          ]
		      },
			 
			  {   name: 'Alan', 				
		          evaluations: [
		            {ans1: '2', ans2: '1', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '2', ans4: '2', ans5: '3',  comment: 'Ok'},
					{ans1: '4', ans2: '2', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '1', ans4: '2', ans5: '4',  comment: 'Inactive most of the time'},
		            {ans1: '1', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'abc', 				
		          evaluations: [
		            {ans1: '2', ans2: '2', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '3', ans4: '4', ans5: '5',  comment: ''},
					{ans1: '4', ans2: '2', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
		            {ans1: '1', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Joseph', 				
		          evaluations: [
		            {ans1: '2', ans2: '1', ans3: '4', ans4: '2', ans5: '5',  comment: 'Worked well'},
					{ans1: '3', ans2: '3', ans3: '3', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '4', ans3: '4', ans4: '5', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '2',  comment: 'Bad work ethic'},
		            {ans1: '5', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Jacob', 				
		          evaluations: [
		            {ans1: '1', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'Very nice teammate'},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'Ok'},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'He worked really hard'},
		            {ans1: '5', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Steven', 				
		          evaluations: [
		            {ans1: '1', ans2: '3', ans3: '1', ans4: '2', ans5: '2',  comment: ''},
					{ans1: '2', ans2: '1', ans3: '4', ans4: '5', ans5: '4',  comment: 'Ok'},
					{ans1: '2', ans2: '3', ans3: '5', ans4: '2', ans5: '3',  comment: 'Good to have him in our team'},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '4', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: 'Works a lot'}
		          ]
		      },
			 
			  {   name: 'Alex', 				
		          evaluations: [
		            {ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'Great teamplayer'},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'Did not work at all'},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: 'Good leader'},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '5', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Lukas', 				
		          evaluations: [
		            {ans1: '', ans2: '', ans3: '', ans4: '', ans5: '',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Tiago', 				
		          evaluations: [
		             {ans1: '', ans2: '', ans3: '', ans4: '', ans5: '',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Rick', 				
		          evaluations: [
		            {ans1: '1', ans2: '5', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '2', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '5', ans4: '1', ans5: '4',  comment: 'Ok'},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '5',  comment: ''},
					{ans1: '5', ans2: '4', ans3: '1', ans4: '3', ans5: '4',  comment: 'Really nice person'},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '2',  comment: ''},
					{ans1: '3', ans2: '2', ans3: '3', ans4: '3', ans5: '4',  comment: 'Works hard'},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: 'Very lazy'}
		          ]
		      },
			 
			  {   name: 'lucas', 				
		          evaluations: [
		            {ans1: '1', ans2: '2', ans3: '4', ans4: '3', ans5: '4',  comment: ''},
					{ans1: '2', ans2: '2', ans3: '2', ans4: '3', ans5: '2',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '3', ans4: '2', ans5: '2',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '5', ans3: '3', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '3', ans4: '2', ans5: '5',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Eduardo', 				
		          evaluations: [
		            {ans1: '1', ans2: '2', ans3: '3', ans4: '4', ans5: '1',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '5', ans5: '2',  comment: ''},
					{ans1: '3', ans2: '4', ans3: '3', ans4: '3', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: ''},
					{ans1: '2', ans2: '5', ans3: '5', ans4: '2', ans5: '5',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '3', ans5: '1',  comment: ''},
					{ans1: '3', ans2: '4', ans3: '5', ans4: '3', ans5: '2',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Brenda', 				
		          evaluations: [
		            {ans1: '1', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			  
			  {   name: 'Pierre', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '1', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '4', ans5: '5',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '1', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '3', ans5: '1',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '1', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '5', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '2', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '2',  comment: ''},
		            {ans1: '5', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Emmanuel', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '4', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'Rosebelle', 				
		          evaluations: [
		            {ans1: '2', ans2: '2', ans3: '5', ans4: '5', ans5: '4',  comment: 'Nice teammate'},
					{ans1: '3', ans2: '2', ans3: '3', ans4: '3', ans5: '2',  comment: 'Works hard'},
					{ans1: '4', ans2: '1', ans3: '4', ans4: '4', ans5: '1',  comment: 'Friendly and supportive of the team'},
					{ans1: '4', ans2: '4', ans3: '5', ans4: '5', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '5', ans3: '3', ans4: '3', ans5: '1',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '5', ans4: '3', ans5: '3',  comment: 'Did not like her approach'},
					{ans1: '2', ans2: '4', ans3: '3', ans4: '2', ans5: '1',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: ''},
		            {ans1: '4', ans2: '5', ans3: '3', ans4: '1', ans5: '1',  comment: 'Bad worker'}
		          ]
		      },
			 
			  {   name: 'Tony', 				
		          evaluations: [
		            {ans1: '3', ans2: '2', ans3: '2', ans4: '3', ans5: '2',  comment: 'Did not work at all'},
					{ans1: '2', ans2: '2', ans3: '2', ans4: '4', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '3', ans5: '4',  comment: 'Absent most of the meetings'},
					{ans1: '5', ans2: '4', ans3: '3', ans4: '2', ans5: '5',  comment: ''},
					{ans1: '5', ans2: '5', ans3: '4', ans4: '3', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '3', ans4: '2', ans5: '2',  comment: 'Always late with his tasks'},
					{ans1: '3', ans2: '5', ans3: '4', ans4: '3', ans5: '5',  comment: ''},
					{ans1: '3', ans2: '1', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '3',  comment: ''}
		          ]
		      },
			 
			  {   name: 'tom', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '1',  comment: 'Ok'},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '1',  comment: 'Good'},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '1',  comment: 'Funny guy'},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '1',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '2',  comment: 'Does not work hard enough'},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '5',  comment: 'Very friendly'},
		            {ans1: '4', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: 'Very responsible'}
		          ]
		      },
			 
			  {   name: 'Andrew', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '1', ans4: '1', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '4', ans3: '5', ans4: '2', ans5: '4',  comment: 'Did not come to any meeting'},
					{ans1: '4', ans2: '3', ans3: '1', ans4: '3', ans5: '1',  comment: ''},
					{ans1: '5', ans2: '2', ans3: '3', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: 'Always late'},
					{ans1: '4', ans2: '3', ans3: '1', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '4', ans3: '4', ans4: '5', ans5: '1',  comment: 'Good leader'},
					{ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '5', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 
			  {   name: 'lasdfjk', 				
		          evaluations: [
		            {ans1: '2', ans2: '1', ans3: '5', ans4: '1', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '5', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '1', ans3: '4', ans4: '3', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '4', ans3: '3', ans4: '4', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '2', ans3: '2', ans4: '5', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '2', ans3: '2', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '4', ans3: '4', ans4: '3', ans5: '3',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '1', ans4: '4', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '3',  comment: ''}
		          ]
		      },
			  
			  {   name: 'ddd', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '2', ans4: '1', ans5: '1',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '3', ans4: '3', ans5: '1',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '3', ans5: '2',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '5', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '4', ans5: '3',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '1', ans4: '5', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '3', ans5: '5',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '3', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			 			
			  {   name: 'sdfa', 				
		          evaluations: [
		            {ans1: '5', ans2: '5', ans3: '5', ans4: '2', ans5: '2',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '3', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '2', ans3: '1', ans4: '4', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '5', ans3: '1', ans4: '5', ans5: '5',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '3',  comment: ''},
					{ans1: '5', ans2: '4', ans3: '1', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '5',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			
			  {   name: 'asdffffff', 				
		          evaluations: [
		            {ans1: '2', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '4', ans4: '2', ans5: '4',  comment: ''},
		            {ans1: '3', ans2: '5', ans3: '3', ans4: '1', ans5: '4',  comment: ''}
		          ]
		      },
			
			  {   name: 'fsadfsdflkj', 				
		          evaluations: [
		            {ans1: '5', ans2: '3', ans3: '4', ans4: '1', ans5: '1',  comment: ''},
					{ans1: '1', ans2: '3', ans3: '2', ans4: '2', ans5: '2',  comment: ''},
					{ans1: '1', ans2: '2', ans3: '4', ans4: '3', ans5: '3',  comment: ''},
					{ans1: '2', ans2: '3', ans3: '2', ans4: '2', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '3', ans3: '4', ans4: '4', ans5: '4',  comment: ''},
					{ans1: '5', ans2: '3', ans3: '5', ans4: '2', ans5: '5',  comment: ''},
					{ans1: '4', ans2: '3', ans3: '4', ans4: '5', ans5: '4',  comment: ''},
					{ans1: '3', ans2: '5', ans3: '1', ans4: '2', ans5: '3',  comment: ''},
		            {ans1: '3', ans2: '4', ans3: '3', ans4: '1', ans5: '2',  comment: ''}
		          ]
		      }
			
			  
		 ];
  });