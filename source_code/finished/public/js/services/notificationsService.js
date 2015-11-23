
angular.module('notificationsService', [])

    .factory('Notifications', function($http) {

        var notificationsFactory = {};

        notificationsFactory.all = function(){
            return $http.get('/notifications/notifications/');
        }
    
        notificationsFactory.create = function(notificationsData) {
            return $http.post('/notifications/notifications/', notificationsData);
        };

        return notificationsFactory;

    });