angular.module('reviewServices',[]).factory('Review',['$http',function($http){
	var reviewFactory =  {};
		reviewFactory.allPeer = function(){
			return $http.get('/eval/peer')
		};
		reviewFactory.allProject = function(){
			return $http.get('/eval/project')
		};
		return reviewFactory;
	}]);
