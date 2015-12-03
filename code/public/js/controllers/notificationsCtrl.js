
angular.module('notificationsCtrl', ['notificationsService', 'mailService'])

    .controller('notificationsController', function(Notifications, Mail) {

        var vm = this;
        vm.tagline = 'up-to-date messages!';	
      
        vm.type = 'create';
    
        // function to create a notification
        vm.saveNotifications = function() {
            vm.processing = true;
            vm.message = '';
            
            vm.emailData = {};
            vm.emailData.sender = 'Masoud Sadjadi <vipadmin@fiu.edu>';
            vm.emailData.recipient = ['eguer048@fiu.edu', 'aniet009@fiu.edu'];
            vm.emailData.subject = 'New notification from group ' + vm.notificationsData.id;
            vm.emailData.message = 'A new notification received! \n\n' + vm.notificationsData.message + '\nLINK: http://localhost:3000/snotifications';

            // use the create function in the notificationsService
            Notifications.create(vm.notificationsData)
                .success(function(data) {
                    vm.processing = false;
                    Mail.sendEmail(vm.emailData)
                            .success(function(data) {
                                console.log("Successful send!");
                            })
                    vm.notificationsData = {};
                    vm.message = data.message;                                       
                });
        };
    })
    
    .controller('snotificationsController',function($scope,$auth,Notifications){
        var vm = this;
        vm.tagline = 'new messages!';
        vm.processing = true;
        
        var token = $auth.getPayload();
        vm.mail = token.mail;
    
        Notifications.studProjName(vm.mail)
            .success(function(data){
                vm.project = data;
            });  
    
        vm.check = function(data)
        {
                console.log('here');
            if(data==vm.project)
            {
                    return 1;
            }
            else{
                return 0;
            }
        };
    
        Notifications.all()
            .success(function(data){
                vm.processing = false;
                vm.notifications = data;
            });     
        
    });

   