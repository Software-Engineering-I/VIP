angular.module('reviewController', ['reviewServices'])

.controller('tabController',function($scope,$auth,$window,Review){
  $scope.peerReviews = [{studentID:'Paul', projectID:'project2'},{studentID:'John',projectID:'Project5'},{studentID:'Lucie',projectID:'Project1'}];
  $scope.projectReviews = [{studentID:'Jogn', projectID:'project2'},{studentID:'Jimmy',projectID:'Project5'},{studentID:'Sara',projectID:'Project1'}];
  
  $scope.hideHome = false;
  $scope.hidePeer = true;
  $scope.hideProject = true;

  $scope.sortedByNumAsc = true;
  $scope.sortedByNumDesc = false;
  $scope.sortedByStudentAsc = false;
  $scope.sortedByStudentDesc = false;

  Review.allPeer()
    .success(function(data){
       $scope.peerReviews = data;
  });
  Review.allProject()
    .success(function(data){
       $scope.projectReviews = data;
  });

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
