//Created by Eduardo Guerra
//Service to send data for email
angular.module('mailService', [])

    .factory('Mail', function($http) {
        
        var mailFactory = {};
        
        //Sends email based on mailData info
        mailFactory.sendEmail = function(mailData){
            return $http.post('/nodeemail/nodeemail/', mailData);
        }
        
        return mailFactory;
})