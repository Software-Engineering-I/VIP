angular.module('helpController', ['helpService'])

.controller('tutorialController', function(Tutorials) {

    var vm = this;

    vm.links = {};

    var getAll = function() {
        Tutorials.allTuts()
        .success(function(data) {
            vm.links = data;
        });
    }

    getAll();

    vm.addTurorial = function() {
        Tutorials.createTuts(vm.formData)
            .success(function(data) {
                getAll();
                vm.formData = {};
            });
    }
})

.controller('referenceController', function(Reference) {

	var vm = this;

    vm.links = {};

    var getAll = function() {
        Reference.allRefs()
        .success(function(data) {
            vm.links = data;
        });
    }

    getAll();

    vm.addReference = function() {
    	Reference.createRefs(vm.formData)
    		.success(function(data) {
    			getAll();
                vm.formData = {};
            });
    }
});