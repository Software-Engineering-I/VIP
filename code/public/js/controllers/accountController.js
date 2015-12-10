angular.module('accountController', ['satellizer','userService'])

.config(function($authProvider) {

    $authProvider.google({
        clientId: '577160044779-hjsgal811fa0jlmd6jrl9lv0ab17hfgs.apps.googleusercontent.com'
    });
})

.controller('SignInCtrl', function($scope, $location, $auth) {
    $scope.authenticate = function(provider)
    {
        $auth.authenticate(provider);
        //$location.path('/signin');//not sure this is necessary
    };
})

.controller('SignOutCtrl', function($scope, $auth) {
    if(!$auth.isAuthenticated()) { return; }
    $auth.logout();
})

.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
})

.controller('RoleCtrl', function($scope, $auth){
	var token = $auth.getPayload();
	$scope.userId;
	//console.log(token.type);
	$scope.getUserType = function()
	{
		if(token.type=='Student')
		{
			console.log(token.type);
			$scope.userId = 1;
			return $scope.userId;
		}
		if(token.type=='Faculty')
		{
			$scope.userId = 2;
			return $scope.userId;
		}
		if(token.type=='PI/CoPI')
		{
			$scope.userId = 3;
			return $scope.userId;
		}
		if(token.type=='Staff')
		{
			$scope.userId = 4;
			return $scope.userId;
		}
	};	
})

.controller('ProfileCtrl',function($auth, Subscriptions, User) {
    
    var vm = this;

    var token = $auth.getPayload();

    //token.pic contains picture, working properly
    vm.picture = token.pic;
    vm.mail = token.mail;
	vm.utype = token.type;
	vm.editmode = false;
	User.userFromEmail(token.mail).success(function(data){
		vm.uData = data;
		vm.uData.year =( data.year != null) ? data.year : "N/A" ;
		vm.uData.cell = (data.cell !=  null) ? data.cell : "N/A";
		vm.uData.major = (data.major != null) ? data.major : "Please fill out Resume";
		vm.uData.project = (data.project != null) ? data.project : "N/A";
		vm.uData.skills =(data.skills != null) ?  data.skills : "Please fill out Resume";
	});

	vm.toggleEditMode = function(){
		vm.editmode = !vm.editmode;
		if(!vm.editmode)
		{
			vm.uData.cell = angular.element(cell).html();
			vm.uData.skills = angular.element(skills).html();
			vm.uData.userSummary = angular.element(usum).html();
			console.log(vm.uData.cell);
			User.updateProfile(vm.mail, vm.uData);
		}
	}


    vm.subData = {
        email: token.mail
    };


    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'create';

    vm.message = '';
     // checks if user is already subscribed
    Subscriptions.get(vm.mail)
    .success(function(data) {
                vm.message = data.message;

                if(vm.message === vm.mail)
                {
                    // subscriber checkbox is not checked if user is not subscribed
                    vm.checked = true;
                }
                else
                {
                    // subscriber checkbox is checked if user is already subscribed
                    vm.checked = false;
                }
            });

        // function subscribes user if checked or unsubscribes user if unchecked
        vm.subscribe = function() {
            if(vm.checked)
            {

                // add user email to database
                Subscriptions.create(vm.subData)
                .success(function(data) {
                        vm.message = data.message;
                    });
                alert('You subscribed');
            } else
            {
                // delete user email from database
                Subscriptions.delete(vm.mail)
                .success(function(data) {
                        vm.message = data.message;
                    });
                alert('You unsubscribed');
            }
        };


})

// controller to get all the subscribers
.controller('subscriptionListController', function(Subscriptions) {

        var vm = this;

         vm.processing = true;

        // function to get all the subscribers
        Subscriptions.all()
            .success(function (data) {

                vm.processing = false;

                vm.subs = data;
            });
});

