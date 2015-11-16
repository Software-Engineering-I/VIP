angular.module('MyApp', [
	'appRoutes', 
	'satellizer', 
	'reportControl', 
	'accountController', 
	'membershipController',
	'userCtrl',
	'userService',
	'angular.filter',
	'projectsController',
	'ui.bootstrap',
	'feedbackCtrl',
	'selectedViewCtrl',
	'projectService'
])
.config(function($authProvider) {

	$authProvider.google({
		clientId: '577160044779-hjsgal811fa0jlmd6jrl9lv0ab17hfgs.apps.googleusercontent.com'
	});

	$authProvider.live({
		clientId: 'Microsoft Client ID'
	});
});