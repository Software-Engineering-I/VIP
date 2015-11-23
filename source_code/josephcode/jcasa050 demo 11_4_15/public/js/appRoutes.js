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
		})
    
        .state('events', {
			url: '/events',
			templateUrl:'/views/pages/events.html',
			controller: 'eventController',
			controllerAs: 'event'
		})
    
        .state('createevent', {
            url: '/events/create',
            templateUrl: '/views/pages/createevent.html',
            controller: 'eventCreateController',
            controllerAs: 'event'
        });

	$locationProvider.html5Mode(true);

});