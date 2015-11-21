angular.module('MyApp',['ui.router', 'accountController'])

.config(function($urlRouterProvider, $stateProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		//home
		.state('home', {
			url:'/',
			templateUrl: "views/pages/home.html"
		})
		//about page
		.state('about',{
			url:'/about',
			templateUrl: "views/pages/about.html"
		})
		//programs page
		.state('programs',{
			url:'/programs',
			templateUrl: "views/pages/programs.html"
		})
		//register page
		.state('register',{
			url:'/register',
			templateUrl: "views/pages/register.html"
		})
		$locationProvider.html5Mode(true);
	});