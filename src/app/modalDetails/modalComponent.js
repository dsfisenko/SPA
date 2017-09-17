(function () {
    'use strict';

    angular
        .module('app')
        .component('modalComponent', {
            templateUrl: 'app/modalDetails/incidentInfoContent.html',
            bindings: {
                resolve: '<',
                close: '&'
            },
            controller: mcController
        });

    function mcController() {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.incident = $ctrl.items[0];
        };

        $ctrl.Resolve = function () {
            $ctrl.close();
        };
    }

})();