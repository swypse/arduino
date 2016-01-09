var app = angular.module("app", ["chart.js"]);

app.config(function (ChartJsProvider) {
	ChartJsProvider.setOptions({
		colours: ['red', 'blue', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
		responsive: false,
		animation: false,
		showTooltips: false,
		pointDot: false,
		datasetStrokeWidth: 0.5,
		scaleBeginAtZero: true,
		scaleOverride: true,
		scaleStartValue: 0,
		scaleStepWidth: 10,
		scaleSteps: 30
	});
});


app.controller("ArduinoController", function ($scope, arduino, $timeout, $http, dataService) {
	$scope.arduino = arduino;

	$scope.dataService = dataService;



});


app.service("dataService", function ($http, $timeout) {
	var dataService = {
		labels: [],
		data: [
			[]
		],
		n: 20
	};

	dataService.data[0].fill(0, 0, 20);
	dataService.labels.fill("", 0, 20);

	function get() {
		$http.get("http://192.168.0.8:3000/").then(function (data) {
			var l = dataService.labels,
				d = dataService.data[0];
			l.push("");
			d.push(parseInt(data.data));
			dataService.labels = _.last(l, dataService.n);
			dataService.data[0] = _.last(d, dataService.n);
			$timeout(get, 100);
		});
	};
	get();

	return dataService;
});









function f($interval) {
	var arduino = {
		values: [
			{ name: "ADC0", value: 1 },
			{ name: "ADC1", value: 1 },
			{ name: "ADC2", value: 1 },
			{ name: "ADC3", value: 1 }
		]
	};

	$interval(function () {
		arduino.values[0].value++;

	}, 1000);

	return arduino;
}
app.service("arduino", f);




if (!Array.prototype.fill) {
	Array.prototype.fill = function (value) {

		// Шаги 1-2.
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		var O = Object(this);

		// Шаги 3-5.
		var len = O.length >>> 0;

		// Шаги 6-7.
		var start = arguments[1];
		var relativeStart = start >> 0;

		// Шаг 8.
		var k = relativeStart < 0 ?
		  Math.max(len + relativeStart, 0) :
		  Math.min(relativeStart, len);

		// Шаги 9-10.
		var end = arguments[2];
		var relativeEnd = end === undefined ?
			len : end >> 0;

		// Шаг 11.
		var final = relativeEnd < 0 ?
		  Math.max(len + relativeEnd, 0) :
		  Math.min(relativeEnd, len);

		// Шаг 12.
		while (k < final) {
			O[k] = value;
			k++;
		}

		// Шаг 13.
		return O;
	};
}