angular.module('accountController', [])

.controller('SignInCtrl', function($scope, $auth) {
    $scope.authenticate = function(provider)
    {
        $auth.authenticate(provider);
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