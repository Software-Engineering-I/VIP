/**
 * Created by Emmanuel on 10/23/2015.
 */
angular.module('eventService', [])

    .factory('Event', function($http) {

        // create a new object
        var eventFactory = {};

        // get a single user
        eventFactory.get = function(id) {
            return $http.get('/api/events/' + id);
        };

        // get all users
        eventFactory.all = function() {
            return $http.get('/api/events/');
        };

        // create a user
        eventFactory.create = function(eventData) {
            return $http.post('/api/events/', eventData);
        };

        // update a user
        eventFactory.update = function(id, eventData) {
            return $http.put('/api/events/' + id, eventData);
        };

        // delete a user
        eventFactory.delete = function(id) {
            return $http.delete('/api/events/' + id);
        };

        // return our entire userFactory object
        return eventFactory;

    });