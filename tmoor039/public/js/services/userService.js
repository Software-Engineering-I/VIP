angular.module('userService', [])

    .factory('User', function($http) {

        // create a new object
        var userFactory = {};

        // get a single user
        userFactory.get = function(id) {
            return $http.get('/userapi/users/' + id);
        };


        // get all users
        userFactory.all = function() {
            return $http.get('/userapi/users/');
        };

        // create a user
        userFactory.create = function(userData) {
            return $http.post('/userapi/users/', userData);
        };

        // Verify a users email address
        userFactory.verifyEmail = function(id, userData) {
            return $http.put('/userapi/verification/' + id, userData);
        };

        //Pull userType from the database
        userFactory.getUserType = function(email){
            return $http.get('/userapi/usertype/' + email);
        };

        // A PI Verifies a user as Faculty or PI
        userFactory.pIVerify = function(id, userData) {
            return $http.put('/userapi/piverification/' + id, userData);
        };

        // update a user
        userFactory.update = function(id, userData) {
            return $http.put('/userapi/users/' + id, userData);
        };

        // delete a user
        userFactory.delete = function(id) {
            return $http.delete('/userapi/users/' + id);
        };

        userFactory.pidelete = function(id) {
            return $http.delete('/userapi/users/' + id);
        };

        // return our entire userFactory object
        return userFactory;

    });