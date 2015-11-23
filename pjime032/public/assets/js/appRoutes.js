angular.module('appRoutes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// home page
			.when('/', {
				templateUrl: 'views/nerd.html',
				controller: 'MainController'
			})

			.when('/nerds', {
				templateUrl: 'views/nerd.html',
				controller: 'NerdController'
			})

			.when('/geeks', {
				templateUrl: 'views/geek.html',
				controller: 'GeekController'
			})
			.when('/groups', {
				templateUrl: 'app/views/pages/groups.html',
				controller: 'userController',
				controllerAs: 'gUser'
			})
			.when('/upevents', {
				templateUrl: 'app/views/pages/upevents.html',
				controller: 'eventController',
				controllerAs: 'upEvent'
			})
			.when('/upcomingevents', {
				templateUrl: 'app/views/pages/upcomingevents.html',
				controller: 'eventController',
				controllerAs: 'upEvent'
			})
			.when('/events/create', {
				templateUrl: 'app/views/pages/ecreate.html',
				controller: 'eventCreateController',
				controllerAs: 'upCEvent'
			})
			//when( this path, route here)
			.when('/users/create', {
				templateUrl: 'app/views/pages/create.html',
				controller: 'userCreateController',
				controllerAs: 'cUser'
			});

		$locationProvider.html5Mode(true);

	});