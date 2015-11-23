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
	.state('projectEvaluation', {
		url: '/projectEvaluation',
		templateUrl: 'views/pages/projectEvaluation.html',
		controller: 'projectEvaluationController',
		controllerAs: 'evaluation'
	})
  .state('feedback', {
    url: '/feedback',
    templateUrl: 'views/pages/feedbackForm.html',
    controller: 'feedbackController',
    controllerAs: 'fcontrol'
  })
	.state('group1',{
		url: '/group1',
		templateUrl: 'views/pages/group1.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('group2',{
		url: '/group2',
		templateUrl: 'views/pages/group2.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('group3',{
		url: '/group3',
		templateUrl: 'views/pages/group3.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('group4',{
		url: '/group4',
		templateUrl: 'views/pages/group4.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('group5',{
		url: '/group5',
		templateUrl: 'views/pages/group5.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('student1',{
		url: '/student1',
		templateUrl:'views/pages/student1.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('student2',{
		url: '/student2',
		templateUrl:'views/pages/student2.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('student3',{
		url: '/student3',
		templateUrl:'views/pages/student3.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('student4',{
		url: '/student4',
		templateUrl:'views/pages/student4.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	.state('student5',{
		url: '/student5',
		templateUrl:'views/pages/student5.html',
		controller: 'userController',
		controllerAs: 'controller'
	})
	
	.state('review',{
		url: '/review',
		templateUrl: 'views/pages/review.html',
		controller: 'tabController',
	})
  .state('question',{
    url: '/question',
    templateUrl: 'views/pages/questionForm.html',
    controller: 'questionController',
    controllerAs: 'qcontrol'
  })
  
  	.state('eval', {
    url: '/evaluation',
    templateUrl: 'views/pages/peerEvaluation.html',
    controller: 'evalController',
    controllerAs: 'econtrol'
  })
  
  
  ;

  
	$locationProvider.html5Mode(true);
});
