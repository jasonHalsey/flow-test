
//Stream Flow Test
var flowAPI = "http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14092500&parameterCd=00060,00065&siteType=ST";

weatherFn = function(url) {
  $.getJSON(url, function (json) {
  	var weatherTime  = json.time.startPeriodName[0]
		var weatherText = json.data.text[0]
		var weatherWeather = json.data.weather[0]
		var weatherTemp = json.data.temperature[0]

		$('.weather_time').text(weatherTime);
		$('.weather_temp').text(weatherTemp);
		$('.weather_text').text(weatherText);
		$('.weather_weather').text(weatherWeather);

		if(weatherWeather == "Isolated Showers") {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}



	})
}

$.getJSON(flowAPI, function (json) {

	var baseString = json.value.timeSeries[0]
	var locationName = baseString.sourceInfo.siteName
	var flowNum = baseString.values[0].value[0].value
	var flowLat = baseString.sourceInfo.geoLocation.geogLocation.latitude
	var flowLong = baseString.sourceInfo.geoLocation.geogLocation.longitude
	weatherFn("http://forecast.weather.gov/MapClick.php?lat=" + flowLat + "&lon=" + flowLong + "&FcstType=json");

	// Set the table td text
    $('#sitename').text(locationName);
    $('#flowNum').text(flowNum + 'cu ft/s');

    if(flowNum >= 4700) {
    	$('#gauge').addClass('success');
    }
})
