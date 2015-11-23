/**
 * Created by Lucas on 11/3/2015.
 */
angular.module('selectedViewCtrl',['projectService'])

.controller('viewController', function($routeParams, Project){
    var vm = this;

    Project.get($routeParams.project_id)
        .success(function(data){
            vm.projectData = data;
        })

        vm.updateProject = function () {
            vm.processing = true;
            vm.message = '';

            Project.update($routeParams.project_id, vm.projectData)
                .success(function (data) {
                    vm.processing = false;

                    vm.projectData = {};

                    vm.message = data.message;
                });
        };

        /*


        vm.updateTrue = function () {
            vm.message = '';

            Project.update($routeParams.project_id, true)
                .success(function(data){
                    vm.processing = false;

                    vm.projectData = {};

                    vm.message = data.message;
                });
        };

        vm.updateFalse = function () {
            vm.message = '';

            Project.update($routeParams.project_id, false)
                .success(function(data){
                    vm.processing = false;

                    vm.projectData = {};

                    vm.message = data.message;
                });
        };
*/

});