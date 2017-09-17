(function () {
    'use strict';
    var controllerId = 'listdata';

    angular
        .module('app')
        .controller(controllerId, listdata);

    function listdata($scope, $http, $uibModal, $document) {
        //var auth = window.btoa(serviceNowApi.uLogin + ':' + serviceNowApi.uPass),
        //headers = {"Authorization": "Basic " + auth};
        //var adressApi = serviceNowApi.baseUrl+ 'table//incident?sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=description%2Copened_at%2Curgency%2Cstate%2Cnumber%2Ccaller_id&sysparm_limit=50';
        $scope.incidents = [];
        $http.get("mockJson/listdata.json").then(function (response) {
            $scope.incidents = response.data.result;
        });
	
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }

        $scope.open = function (incident, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-inident ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
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
        };
    }

})();