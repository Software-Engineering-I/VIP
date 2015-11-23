angular.module('reviewController', [])

.controller('tabController',function($scope,$auth,$window){
  $scope.peerReviews = [{name:'Paul', projNum:'project2'},{name:'John',projNum:'Project5'},{name:'Lucie',projNum:'Project1'}];
  $scope.projectReviews = [];
  
  $scope.hideHome = false;
  $scope.hidePeer = true;
  $scope.hideProject = true;

  $scope.sortedByNumAsc = true;
  $scope.sortedByNumDesc = false;
  $scope.sortedByStudentAsc = false;
  $scope.sortedByStudentDesc = false;

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
	$scope.viewPeerReview = function(){
		$window.location.href = '/student1';
	};
  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  };
});
