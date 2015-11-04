angular.module('mainApp', ['appRoutes','reviewController'])

.controller('mainController', function() {

	var vm = this;

	vm.tagline = 'To the moon and back!';	

})

.controller('homeController', function() {

	var vm = this;

	vm.tagline = 'To the moon and back!';	

})


.controller('aboutController', function() {

	var vm = this;

	vm.tagline = 'Nothing beats a pocket protector!';

})

.controller('programsController', function() {

	var vm = this;
	vm.tagline = 'The square root of life is pi!';	

})

.controller('reviewController',function($scope){
  $scope.peerReviews = [{name:'Paul', projNum:'project2'},{name:'John',projNum:'Project5'},{name:'Lucie',projNum:'Project1'}];
  $scope.projectReviews = [];
  
  $scope.temp = false;
  $scope.hideHome = false;
  $scope.hidePeer = true;
  $scope.hideProject = true;

  $scope.showHome = function() {
    $scope.hideHome = false;
    $scope.hidePeer = true;
    $scope.hideProject = true;
  };
  $scope.showPeer = function() {
    $scope.hideHome = true;
    $scope.hidePeer = false;
    $scope.hideProject = true;
  };
  $scope.showProject = function() {
    $scope.hideHome = true;
    $scope.hidePeer = true;
    $scope.hideProject = false;
  };
});
