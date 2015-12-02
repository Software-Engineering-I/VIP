angular.module('reviewServices',[]).factory('Review',['$http',function($http){
	var reviewFactory =  {};
		reviewFactory.all = function(){
			return $http.get('/peerEval/all')
		};
		return reviewFactory;
	}]);