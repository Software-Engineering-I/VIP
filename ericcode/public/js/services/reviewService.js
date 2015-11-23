angular.module('reviewServices',[]).factory('Review',['$http',function($http){
	var reviewFactory =  {};
		reviewFactory.all = function(){
			return $http.get('/reviews/peers/meta')
		};
	}])