angular.module('appRoutes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {
        $routeProvider

        .when('/users', {
            templateUrl: 'app/views/pages/all.html',
            controller: 'userController',
            controllerAs: 'aUser'
        })

            //when( this path, route here)
        .when('/users/create', {
            templateUrl: 'app/views/pages/create.html',
            controller: 'userCreateController',
            controllerAs: 'cUser'

        })

        .when('/registration',{
            templateUrl: 'app/views/pages/registration.html',
            controller: 'userCreateController',
            controllerAs: 'cUser'
        });

    $locationProvider.html5Mode(true);

});