angular.module('subscriptionService', [])

    //.factory('Subscribers', function($http) {
      .factory('Subscriptions', function($http) {

        // create a new object
        var subscriptionFactory = {};

        // create a user
        subscriptionFactory.create = function(subData) {
            return $http.post('/subapi/subscribers/', subData);
	    };

        subscriptionFactory.get = function(email){
            return $http.get('/subapi/findsub/' + email);
        };

        subscriptionFactory.delete = function(email){
            console.log('hello from delete service');
            return $http.delete('/subapi/deletesub/' + email);
        };

        subscriptionFactory.all = function() {
            return $http.get('/subapi/subscriptionList/');
        };

        return subscriptionFactory;

    });
