
//Stream Flow Test
var flowAPI = "http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=14092500&parameterCd=00060,00065&siteType=ST";

weatherFn = function(url) {
  $.getJSON(url, function (json) {

  	var dateCreate = json.creationDateLocal
  	var weatherTime  = json.time.startPeriodName[0]
		var weatherText = json.data.text[0]
		var weatherWeather = json.data.weather[0]
		var weatherTemp = json.data.temperature[0]

		$('.weather_date').text(dateCreate);
		$('.weather_time').text(weatherTime);
		$('.weather_temp').html(weatherTemp + '&deg;');
		$('.weather_text').text(weatherText);
		$('.weather_weather').text(weatherWeather);

		if(weatherWeather == "Isolated Showers") {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}
		else if(weatherWeather == "Mostly Cloudy") {
			$('#weather_icon').addClass('diw-clouds')
		}
		else if(weatherWeather == "Chance Rain") {
			$('#weather_icon').addClass('diw-cloud-hail-sun')
		}
		else if(weatherWeather == "Mostly Sunny") {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}
		else if(weatherWeather == "Mostly Clear") {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}
		else if(weatherWeather == "Sunny") {
			$('#weather_icon').addClass('diw-sun')
		}
		else if(weatherWeather == "Clear") {
			$('#weather_icon').addClass('diw-sun')
		}
		else if(weatherWeather == "Slight Chance Rain then Partly Sunny") {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}
		else {
			$('#weather_icon').addClass('diw-cloud-rain-2-sun')
		}


	})
}

$.getJSON(flowAPI, function (json) {

	var baseString = json.value.timeSeries[0]
	var createTime = baseString.values[0].value[0].dateTime
	var locationName = baseString.sourceInfo.siteName
	var flowNum = baseString.values[0].value[0].value
	var flowLat = baseString.sourceInfo.geoLocation.geogLocation.latitude
	var flowLong = baseString.sourceInfo.geoLocation.geogLocation.longitude
	weatherFn("http://forecast.weather.gov/MapClick.php?lat=" + flowLat + "&lon=" + flowLong + "&FcstType=json");

	// Set the table td text
		$('.createTime').text(createTime);
    $('.sitename').text(locationName);
    $('.flowNum').text(flowNum + 'cu ft/s');


    if(flowNum >= 4700) {
    	$('#gauge').addClass('success');
    }
})
