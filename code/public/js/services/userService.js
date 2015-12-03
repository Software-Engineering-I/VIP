/**
 * Created by Emmanuel on 10/23/2015.
 */
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


        // update a user
        userFactory.update = function(id, userData) {
            return $http.put('/userapi/users/' + id, userData);
        };

        // change a users project
        userFactory.changeProject = function(id, project){
            var data = {"userId": id,"project": project};
            return $http.put('/userapi/users/',data);
        };

        // delete a user
        userFactory.delete = function(id) {
            return $http.delete('/api/users/' + id);
        };
        //PI Delete function

        userFactory.pidelete = function(id) {
            return $http.delete('/userapi/users/' + id);
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
        //Emails to userData.email, with subject userData.subject, with text userData.text
        userFactory.nodeEmail = function(userData){
            return $http.post('/userapi/nodeemail/', userData);
        };

        userFactory.studInProj = function(projectName){
            return $http.get('/userapi/facprojects/'+ projectName);
        };

        userFactory.studProjName = function(email){
            return $http.get('/userapi/studentProject/' + email);
        };

        userFactory.userPeers = function(projectName,email){
            return $http.get('/userapi/userPeers/'+ projectName +'/'+ email);
        };

        userFactory.updateFacAcp = function(id){
            return $http.put('/userapi/facusersaccept/'+ id);
        };

        userFactory.updateFacRjt = function(id){
            return $http.put('/userapi/facusersreject/'+ id);
        };

        // update a faculty comment
        userFactory.updateFacComment = function(id, userData) {
            return $http.put('/userapi/facComment/' + id, userData);
        };

        userFactory.updatePiAcp = function(id){
            return $http.put('/userapi/piusersaccept/'+ id);
        };

        userFactory.updatePiRjt = function(id){
            return $http.put('/userapi/piusersreject/'+ id);
        };

        // update a pi comment
        userFactory.updatePiComment = function(id, userData) {
            return $http.put('/userapi/piComment/' + id, userData);
        };

        userFactory.getResume = function(id){
            return $http.get('/userapi/users/' + id);
        };

        userFactory.putResume = function(email,userData){
            return $http.put('/userapi/resume/' + email,userData);
        };

        userFactory.userFromEmail = function(email){
            return $http.get('/userapi/userinfo/' + email);
        };

        userFactory.updateProfile = function(email, userData){
            return $http.put('/userapi/userProfile/' + email, userData)
        };


        // return our entire userFactory object
        return userFactory;


    });
