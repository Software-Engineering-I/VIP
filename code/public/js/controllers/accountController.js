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
	};	
})

.controller('ProfileCtrl', function($scope, $auth, Account) {
    $scope.getProfile = function() {
        Account.getProfile()
        .then(function(response) {
            $scope.user = response.data;
        });
    };

    $scope.getProfile();
});
