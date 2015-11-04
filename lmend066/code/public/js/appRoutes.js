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

			.state('about', {
				url: '/about',
				templateUrl: 'views/pages/about.html',
				controller: 'aboutController',
				controllerAs: 'about'
			})

			.state('programs', {
				url: '/programs',
				templateUrl: 'views/pages/programs.html',
				controller: 'programsController',
				controllerAs: 'programs'
			})

			.state('projectEvaluation', {
				url: '/projectEvaluation',
				templateUrl: 'views/pages/projectEvaluation.html',
				controller: 'projectEvaluationController',
				controllerAs: 'evaluation'
			});

		$locationProvider.html5Mode(true);
	});