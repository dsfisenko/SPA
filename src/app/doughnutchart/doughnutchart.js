(function () {
    'use strict';
    var controllerId = 'doughnutchart';

    angular
        .module('app')
        .controller(controllerId, doughnutchart);

    function doughnutchart($scope, $http) {
        //var auth = window.btoa(serviceNowApi.uLogin + ':' + serviceNowApi.uPass),
        //headers = { "Authorization": "Basic " + auth };
        //var adressApi = serviceNowApi.baseUrl + 'stats//incident?sysparm_count=true&sysparm_group_by=state&sysparm_display_value=true';
        var backgroundColors = [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#21ba45"
        ];
        $scope.labels = [];
        $scope.data = [];
        $scope.colors = [];
        $scope.chartData = [];
        $http.get("mockJson/doughnutchart.json").then(function (response) {
            var chartData = [];
            var dataArray = response.data.result;
            for (var i = 0, len = dataArray.length; i < len; i++) {
                var data = parseInt(dataArray[i].stats.count);
                var lable = dataArray[i].groupby_fields[0].value;
                var lableColor = backgroundColors[i];
                $scope.labels.push(lable);
                $scope.data.push(data);
                $scope.colors.push(lableColor);
                chartData.push({
                    lable: lable,
                    color: lableColor,
                    data: data
                })
            }
            $scope.chartData = chartData;
        });
        $scope.options = {
            legend: {
                display: false
            }
        };
        $scope.datasetOverride = [
                {
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors
                }];
    }

})();