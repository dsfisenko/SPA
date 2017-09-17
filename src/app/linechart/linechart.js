(function () {
    'use strict';
    var controllerId = 'linechart';

    angular
        .module('app')
        .controller(controllerId, linechart);


    function linechart($scope) {
        $scope.labels = ['August\'16', 'September', 'Oktober', 'November', 'December', 'Junuary', 'February\'17'];
        $scope.data = [18, 48, 40, 19, 86, 27, 90];
        $scope.datasetOverride = [
        {
            label: "Line chart",
            borderWidth: 3,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            type: 'line',
            yAxisID: 'y-axis-1'
        }
        ];
        $scope.options = {
            scales: {
                yAxes: [
                  {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'right'
                  }
                ]
            }
        };
    }

})();