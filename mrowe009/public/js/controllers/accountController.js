

angular.module('accountController', ['satellizer'])
.config(function($authProvider) {

    $authProvider.google({
        clientId: '577160044779-hjsgal811fa0jlmd6jrl9lv0ab17hfgs.apps.googleusercontent.com'
    });
})

.controller('SignInCtrl', function($scope, $auth, $state) {
    $scope.authenticate = function(provider)
    {
        $auth.authenticate(provider)
            .then(function(data) {
                var dToken;
                var nToken;
                switch(data.data.userType) {
                    case 'Student':
                        nToken = $auth.getToken();
                        dToken = $auth.getPayload();
                       // dToken = jwt.decode(nToken, config.TOKEN_SECRET);
                        console.log(nToken);
                        console.log(dToken);
                        console.log(dToken.mail);
                        $state.go('about', {});
                        break;
                    case 'PI':
                        $state.go('programs', {});
                        break;
                    case 'Faculty':
                        $state.go('report', {});
                        break;
                }
            });
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