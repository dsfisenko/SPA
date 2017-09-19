(function () {
    'use strict';
    var controllerId = 'listdata';

    angular
        .module('app')
        .controller(controllerId, listdata);

    function listdata($http, $uibModal, $document) {
		var vm = this;
        var adressApi = '/table/incident?sysparm_display_value=true&sysparm_exclude_reference_link=true' + 
			'&sysparm_fields=description%2Copened_at%2Curgency%2Cstate%2Cnumber%2Ccaller_id&sysparm_limit=75';
        vm.incidents = [];
        vm.sort = function(keyname){
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        }
        vm.open = openDetails;
		
		activate();
		
		function activate() {
			$http.get(adressApi).then(function (response) {
				vm.incidents = response.data.result;
			});
		}
		
		function openDetails(incident, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-inident ' + parentSelector)) : undefined;
            $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/modalDetails/incidentInfoContent.html',
                controller: 'modalInstanceCtrl',
                controllerAs: '$ctrl',
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return [incident];
                    }
                }
            });
        }
    }

})();