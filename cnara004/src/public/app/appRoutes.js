/**
 * Created on 10/8/2015.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '../app/views/pages/home.html',
            controller: 'MainController'
        })

        .when('/about', {
            templateUrl: '../app/views/pages/about.html',
            controller: 'AboutController'
        })

        .when('/projects', {
            templateUrl: '../app/views/pages/projects.html',
            controller: 'projectsController'
        })

        .when('/projects/create', {
            templateUrl: '../app/views/pages/project-create.html',
            controller: 'projectsController'
        });

    $locationProvider.html5Mode(true);

}]);