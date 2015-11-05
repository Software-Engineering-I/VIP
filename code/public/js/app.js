var MyApp = angular.module('MyApp', ['ui.router', 'satellizer'])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/home');
	
		$stateProvider
		.state('signin', {
			url:'/signin',
			templateUrl: "views/pages/signin.html",
			controller: "SignInCtrl"
		})
		.state('signout', {
			url:'/signout',
			templateUrl: "views/pages/signout.html",
			controller: "SignOutCtrl"
		})
		.state('register', {
			url:'/register',
			templateUrl:"views/pages/register.html",
		})
		.state('home', {
			 url:'/home',
			 templateUrl: "/views/pages/home.html"
		 })
		.state('about',{
			 url:'/about',
			 templateUrl: "/views/pages/about.html"
		})
		.state('programs',{
			url:'/programs',
			templateUrl: "/views/pages/programs.html"
		})
		.state('profile',{
			url: '/profile',
			templateUrl: "views/pages/profile.html"
		})
	}]);

MyApp.config(function($authProvider) {

    $authProvider.google({
      clientId: '577160044779-hjsgal811fa0jlmd6jrl9lv0ab17hfgs.apps.googleusercontent.com'
    });

    $authProvider.live({
      clientId: 'Microsoft Client ID'
    });

});

MyApp.controller('SignInCtrl', function($scope, $location, $auth)
{
	$scope.authenticate = function(provider)
	{
		$auth.authenticate(provider);
		$location.path('#/signin');
	};
	/*.catch(function(response){
		$location.path('#/error');
	});*/
});

MyApp.controller('SignOutCtrl', function($scope, $auth){
	if(!$auth.isAuthenticated()) { return; }
	$auth.logout();
});

MyApp.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });

MyApp.controller('ProfileCtrl', function($scope, $auth, Account) {
	$scope.getProfile = function() {
		Account.getProfile()
		  .then(function(response) {
		    $scope.user = response.data;
		  });
	};

	$scope.getProfile();
});

MyApp.factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });
