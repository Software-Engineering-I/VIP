angular.module('evalControl', ['evalService', 'userService'])

    .controller('evalController', function(Evaluation, $auth, User)
    {


        var vm = this ;
        vm.questions ;
        vm.sb = [] ;
        vm.tf = [] ;
        vm.sa = [] ;

        vm.tagline = 'Its working!';

        Evaluation.get()
            .success(function(data)
            {
                vm.questions = data ;

            }) ;

        vm.addEvaluation = function()
        {
            vm.processing = true ;

            Evaluation.update(vm.questions)
                .success(function(data)
                {
                    vm.processing = false ;
                    Evaluation.get()
                        .success(function(data)
                        {
                            vm.questions = data ;

                        }) ;
                    alert(data.message) ;
                }) ;
        };




        //Grab logged in user data
        //vm.token = $auth.getPayload();
        //Store email of logged in user
        //vm.email = vm.token.mail;

        var token = $auth.getPayload();
        //Store email of logged in user
        vm.email = token.mail;
        //vm.email = "lpuch002@fiu.edu"

        User.studProjName(vm.email)
            .success(function(data){
                vm.projectName = data;
            });

        User.userPeers(vm.projectName, vm.email)
            .success(function(data){
                vm.peers = data;
            });
    });
