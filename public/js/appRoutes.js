angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/pages/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})

		//about page
		.when('/about', {
			templateUrl: 'views/pages/about.html',
			controller: 'aboutController',
			controllerAs: 'about'
		})

		//programs page
		.when('/programs', {
			templateUrl: 'views/pages/programs.html',
			controller: 'programsController',
			controllerAs: 'programs'	
		})

	$locationProvider.html5Mode(true);

});