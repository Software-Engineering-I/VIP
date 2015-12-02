
angular.module('notificationsCtrl', ['notificationsService'])

    .controller('notificationsController', function(Notifications) {

        var vm = this;
        vm.tagline = 'up-to-date messages!';	
      
        vm.type = 'create';
    
        // function to create a notification
        vm.saveNotifications = function() {
            vm.processing = true;
            vm.message = '';

            // use the create function in the notificationsService
            Notifications.create(vm.notificationsData)
                .success(function(data) {
                    vm.processing = false;
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

   