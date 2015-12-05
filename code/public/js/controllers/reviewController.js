angular.module('reviewController', ['reviewServices'])

.controller('tabController',function($scope,$auth,$window,Review){
	$scope.peerReviews = [];
	$scope.projectReviews = [];
  
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
	$scope.viewPeerReview = function(id){
		$window.location.href = '/evaluationsDisplay';
	};
	$scope.isAuthenticated = function(){
		return $auth.isAuthenticated();
	};
});
