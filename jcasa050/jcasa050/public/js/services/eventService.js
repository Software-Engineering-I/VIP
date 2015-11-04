
angular.module('eventService', [])

    .factory('Event', function($http) {

        var eventFactory = {};
    
        eventFactory.all = function() {
            return $http.get('/api/events/');
        };

        eventFactory.create = function(eventData) {
            return $http.post('/api/events/', eventData);
        };


        eventFactory.delete = function(id) {
            return $http.delete('/api/events/' + id);
        };

        return eventFactory;

    });