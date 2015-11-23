/**
 * Created by lucas on 10/21/2015.
 */
angular.module('feedbackCtrl',['projectService'])

.controller('feedbackController', function(Project){
   var vm = this;

   Project.all()
       .success(function(data){
          vm.projects = data;
       })
});