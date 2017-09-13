var serviceNowApi = {
    baseUrl: 'https:////dev35531.service-now.com//api//now//',
    uLogin: 'admin',
    uPass: 'admin'
};

var app = angular.module('angularTable', ['angularUtils.directives.dirPagination', 'chart.js', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('listdata', function ($scope, $http, $uibModal, $log, $document) {
    var auth = window.btoa(serviceNowApi.uLogin + ':' + serviceNowApi.uPass),
    headers = {"Authorization": "Basic " + auth};
    var adressApi = serviceNowApi.baseUrl+ 'table//incident?sysparm_display_value=true&sysparm_exclude_reference_link=true&sysparm_fields=description%2Copened_at%2Curgency%2Cstate%2Cnumber%2Ccaller_id&sysparm_limit=50';
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
	        templateUrl: 'incidentInfoContent.html',
	        controller: 'ModalInstanceCtrl',
	        controllerAs: '$ctrl',
	        appendTo: parentElem,
	        resolve: {
	            items: function () {
	                return [incident];
	            }
	        }
	    });
	};
});

app.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.incident = items[0];

    $ctrl.Resolve = function () {
        $uibModalInstance.close();
    };
});

app.component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.incident = $ctrl.items[0];
        };

        $ctrl.Resolve = function () {
            $ctrl.close();
        };
    }
});

app.controller("doughnutchart", function ($scope, $http) {
    var auth = window.btoa(serviceNowApi.uLogin + ':' + serviceNowApi.uPass),
    headers = { "Authorization": "Basic " + auth };
    var adressApi = serviceNowApi.baseUrl + 'stats//incident?sysparm_count=true&sysparm_group_by=state&sysparm_display_value=true';
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
});

app.controller("linechart", function ($scope) {
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
});