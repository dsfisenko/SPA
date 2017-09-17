(function () {
    'use strict';
    var controllerId = 'modalInstanceCtrl';

    angular
        .module('app')
        .controller(controllerId, modalInstanceCtrl);

    function modalInstanceCtrl($uibModalInstance, items) {
        var $ctrl = this;
        $ctrl.incident = items[0];

        $ctrl.Resolve = function () {
            $uibModalInstance.close();
        };
    }

})();