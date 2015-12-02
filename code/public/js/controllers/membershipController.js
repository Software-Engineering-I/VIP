// Made by Tom

angular.module('membershipController', ['membershipService'])

    .controller('memberController', function(Member) {
		
        var vm = this;

        // set a processing variable to show loading things
         vm.processing = true;

        // grab all the members at page load
        // "Member" refers to memberService factory object
        Member.all()
            .success(function (data) {

                 //when all the members come back, remove the processing variable
                vm.processing = false;

                // bind the member that come back to vm.members
                vm.members = data;
            });

        });
	

	
