// Made by Tom

angular.module('membershipService', [])

    .factory('Member', function($http) {

        // create a new object
        var memberFactory = {};
		
        // get all members
        memberFactory.all = function() {
            return $http.get('/membershipReport/members');
        };

        // return our entire memberFactory object
        return memberFactory;

    });