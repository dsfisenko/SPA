var serviceNowApi = {
    baseUrl: 'https:////dev35531.service-now.com//api//now//',
    uLogin: 'admin',
    uPass: 'admin'
};
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