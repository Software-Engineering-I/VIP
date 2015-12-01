angular.module('accountController', ['satellizer'])
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

.controller('ProfileCtrl', function($scope, $auth, Subscriptions) {
    
    var vm = this;

    var token = $auth.getPayload();

    //token.pic contains picture, working properly
    $scope.picture = token.pic;

    // $scope.mail = token.mail;
    vm.mail = token.mail;


    vm.subData = {
        email: token.mail
    };


    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'create';

    vm.message = '';
    Subscriptions.get(vm.subData)
    .success(function(data) {
                vm.message = data.message;

                if(vm.message === 'Email does not exist.')
                {
                    vm.checked = false;
                }
                else
                {
                    vm.checked = true;
                }
            });

        vm.subscribe = function() {

        if(vm.checked)
        {
            console.log(vm.subData.email);
            Subscriptions.create(vm.subData)
            .success(function(data) {
                    vm.message = data.message;
                });
            alert('You subscribed');
        } else
        {
            // delete from database
            Subscriptions.delete(vm.subData)
            .success(function(data) {
                    vm.message = data.message;
                });
            alert('You unsubscribed');
        }
    };

});
