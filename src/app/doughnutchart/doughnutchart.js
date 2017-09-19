(function () {
    'use strict';
    var controllerId = 'doughnutchart';

    angular
        .module('app')
        .controller(controllerId, doughnutchart);

    function doughnutchart($http) {
		var vm = this;
        var adressApi = '/stats/incident?sysparm_count=true&sysparm_group_by=state&sysparm_display_value=true';
        var backgroundColors = [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#21ba45"
        ];
        vm.labels = [];
        vm.data = [];
        vm.colors = [];
        vm.chartData = [];
		vm.options = {
            legend: {
                display: false
            }
        };
        vm.datasetOverride = [
                {
                    backgroundColor: backgroundColors,
                    hoverBackgroundColor: backgroundColors
                }];
				
		activate();
		
		function activate() {
			$http.get(adressApi).then(function (response) {
				var chartData = [];
				var dataArray = response.data.result;
				for (var i = 0, len = dataArray.length; i < len; i++) {
					var data = parseInt(dataArray[i].stats.count);
					var lable = dataArray[i].groupby_fields[0].value;
					var lableColor = backgroundColors[i];
					vm.labels.push(lable);
					vm.data.push(data);
					vm.colors.push(lableColor);
					chartData.push({
						lable: lable,
						color: lableColor,
						data: data
					})
				}
				vm.chartData = chartData;
			});
		} 
    }

})();