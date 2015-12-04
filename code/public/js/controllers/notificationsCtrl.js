
angular.module('notificationsCtrl', ['notificationsService', 'mailService', 'userService'])

    .controller('notificationsController', function(Notifications, Mail, User) {

        var vm = this;
        vm.tagline = 'up-to-date messages!';	
      
        vm.type = 'create';
    
        // function to create a notification
        vm.saveNotifications = function() {
            User.studInProj(vm.notificationsData.id)
                .success(function(data){
                    vm.student = data;
                    var list = [];
                    for(i = 0; i < vm.student.length;i++){
                        list[i] = vm.student[i].email;                       
                    }

                    vm.processing = true;
                    vm.message = '';   
                    vm.emailData = {};
                    vm.emailData.sender = 'Masoud Sadjadi <vipadmin@fiu.edu>';
                    console.log('sending notifications to emails');
                    vm.emailData.recipient = list;
                    vm.emailData.subject = 'New notification from group ' + vm.notificationsData.id;
                    vm.emailData.message = 'A new notification received! \n\n' + vm.notificationsData.message + '\nLINK: http://vip-dev.cis.fiu.edu/snotifications';

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
                
                 });
        };
    })
    
    .controller('snotificationsController',function($scope,$auth,Notifications,User){
        var vm = this;
        vm.tagline = 'new messages!';
        vm.processing = true;
        
        var token = $auth.getPayload();
        vm.mail = token.mail;
    
        User.studProjName(vm.mail)
            .success(function(data){
                vm.project = data;
            });  
    
        vm.check = function(data)
        {
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

   