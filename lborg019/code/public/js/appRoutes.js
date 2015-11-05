angular.module('appRoutes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/")

	$stateProvider
		// home page
		.state('home', {
			url: '/',
			templateUrl: 'views/pages/home.html',
			controller: 'homeController',
			controllerAs: 'home'
		})

		//about page
		.state('about', {
			url: '/about',
			templateUrl: 'views/pages/about.html',
			controller: 'aboutController',
			controllerAs: 'about'
		})

		//programs page
		.state('programs', {
			url: '/programs',
			templateUrl: 'views/pages/programs.html',
			controller: 'programsController',
			controllerAs: 'programs'	
		});

	$locationProvider.html5Mode(true);

});