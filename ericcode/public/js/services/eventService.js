
angular.module('eventService', [])

    .factory('Event', function($http) {

        var eventFactory = {};
    
        eventFactory.all = function() {
            return $http.get('/events/events/');
        };

        eventFactory.create = function(eventData) {
            return $http.post('/events/events/', eventData);
        };


        eventFactory.delete = function(id) {
            return $http.delete('/events/events/' + id);
        };

        return eventFactory;

    });