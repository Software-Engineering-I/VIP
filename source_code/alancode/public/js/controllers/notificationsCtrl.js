





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

    });
//    
//    .controller('stuInboxController',function(){
//        var vm = this;
//        vm.tagline = 'new messages!';
//        vm.processing = true;
////        n.message = 'hello';
//        console.log('in controller');
//    
//        /*Notification.all()
//            .success(function(data){
//                vm.processing = false;
//                vm.notifications = data;
//            });*/
//        
//        
//    });

   