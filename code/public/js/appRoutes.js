angular.module('appRoutes', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider, $locationProvider){
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
	.state('home', {
		url:'/',
		templateUrl: "views/pages/home.html"
	})
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
	.state('about',{
		url:'/about',
		templateUrl: "views/pages/about.html"
	})
	.state('programs',{
		url:'/programs',
		templateUrl: "views/pages/programs.html"
	})
	.state('profile',{
		url: '/profile',
		templateUrl: "views/pages/profile.html"
	})
	.state('report',{
		url: '/report',
		templateUrl: "views/pages/report.html",
		controller: 'reportController',
		controllerAs: 'cReport'
	})
	.state('membershipReport',{
		url: '/membership_report',
		templateUrl: "views/pages/membershipReport.html",
		controller: 'membershipReport',
		controllerAs: 'mReport'
	})
	;

	$locationProvider.html5Mode(true);
});