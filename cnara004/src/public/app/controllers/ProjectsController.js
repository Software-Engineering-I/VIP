/**
 * Created on 10/12/2015.
 */
angular.module('projectsController', []).controller('projectsController', function($scope, Projects) {

    //$scope.line = 'Projects';
    $scope.sortType = 'proj';
    $scope.sortReverse = false;
    $scope.searchBar = '';


    Projects.all()
        .success(function(data){
            $scope.projects = data;
        });

    /*Projects.create(project.data)
        .success(function(data){
            project.data = {};
        });*/

});