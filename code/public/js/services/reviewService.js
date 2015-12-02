angular.module('reviewServices',[]).factory('Review',['$http',function($http){
	var reviewFactory =  {};
		reviewFactory.allPeer = function(){
			return $http.get('/peerEval/all')
		};
		reviewFactory.allProject = function(){
			return $http.get('/projectEval/all')
		};
		return reviewFactory;
	}]);