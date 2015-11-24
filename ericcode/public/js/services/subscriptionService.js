angular.module('subscriptionService', [])

    //.factory('Subscribers', function($http) {
      .factory('Subscriptions', function($http) {

        // create a new object
        var subscriptionFactory = {};

        // create a user
        subscriptionFactory.create = function(subData) {
	    console.log(subData);
            return $http.post('/subapi/subscribers/', subData);
	   // return $http.post('/api/subscriptions/', email);
	};

	// delete a user
        subscriptionFactory.delete = function(id) {
            return $http.delete('/subapi/subscribers/' + id);
        };

        // return our entire reportFactory object
        return subscriptionFactory;

    });
