(function () {
    'use strict';

    angular.module('app', [
        // Custom modules
        'angularUtils.directives.dirPagination',

        // Angular modules
        'chart.js',
        'ngAnimate',
        'ngSanitize',

        // 3rd Party Modules
        'ui.bootstrap']);

})();