angular.module('subscriptionService', [])

      .factory('Subscriptions', function($http) {

        // create a new object
        var subscriptionFactory = {};

        // create a subscriber
        subscriptionFactory.create = function(subData) {
            return $http.post('/subapi/subscribers/', subData);
        };

        // check if user is already a subscriber
        subscriptionFactory.get = function(email){
            return $http.get('/subapi/findsub/' + email);
        };

        // remove subscriber from database
        subscriptionFactory.delete = function(email){
            return $http.delete('/subapi/deletesub/' + email);
        };

        subscriptionFactory.all = function() {
            return $http.get('/subapi/subscriptionList/');
        };

        return subscriptionFactory;

    });
