angular.module('accountController', ['satellizer'])
.config(function($authProvider) {

    $authProvider.google({
        clientId: '577160044779-hjsgal811fa0jlmd6jrl9lv0ab17hfgs.apps.googleusercontent.com'
    });
})

.controller('NavbarCtrl', function($auth, $window) {
    var vm = this;
    vm.authenticate = function(provider)
    {
        $auth.authenticate(provider)
            .then(function(data) {
                var dToken;
                var nToken;
                switch(data.data.userType) {
                    case 'Student':
                        $window.location.href = "http://" + $window.location.host + "/student";
                        break;
                    case 'Pi':
                        $window.location.href = "http://" + $window.location.host + "/pi";
                        break;
                    case 'Faculty':
                        $window.location.href = "http://" + $window.location.host + "/faculty";
                        break;
                    //if no role has been assigned, means he is not in our database meaning he hasnt registered. redirect to registration page
                    default:
                        $window.location.href = "http://" + $window.location.host + "/register";
                        break;
                }
            });
    };

    vm.logout = function()
    {
        alert('Logged out');
        $auth.logout();
        $window.location.href = "http://" + $window.location.host;
    }
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