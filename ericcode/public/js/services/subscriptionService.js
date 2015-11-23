angular.module('subscriptionService', [])

    .factory('Subscribes', function($http) {

        // create a new object
        var subscriptionFactory = {};

        // create a user
        subscriptionFactory.create = function(email) {
            return $http.post('/subscribers/subscriptions/', email);
        };
        // return our entire reportFactory object
        return subscriptionFactory;

    });
