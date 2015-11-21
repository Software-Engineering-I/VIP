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
        $location.path('/signin');
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

.controller('ProfileCtrl', function($scope, $auth, Account) {
    $scope.getProfile = function() {
        Account.getProfile()
        .then(function(response) {
            $scope.user = response.data;
        });
    };

    $scope.getProfile();
});