

$(document).ready(function(){
$body = $("body");

	$(document).on({
	    ajaxStart: function() { $body.addClass("loading"); },
	    ajaxStop: function() { $body.removeClass("loading"); }    
	});
	
	var getLocationButton = $('#button');
	var tempToggle = $('.tempToggle');
	var error = $('#onError');
	var latitude;
	var longitude;

	// get weather button
	getLocationButton.on('click', getLocation);
	// toggle C/F button
	tempToggle.on('click', toggleTemp);

	// toggle C/F function
	function toggleTemp() {
		if($('#celsius').css('display') =='none') {
			$('#celsius').css('display', 'block');
			$('#fahrenheit').css('display', 'none');
		} else {
			$('#celsius').css('display', 'none');
			$('#fahrenheit').css('display', 'block');			
		}
	}

	// get the user's permission to access their current coordinates
	function getLocation() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showWeather);
		} else {
			error.html('Error: Geolocation is not supported by your browser.');
		}
	}

	// get weather api call
	function showWeather(position){
		// retrieve the user's lat and long
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

	 	var url =  `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

		$.getJSON(url).done(function(data) {
			var name = data.name;
			var country = data.sys.country;			
			var celsius = data.main.temp;
			var humidity = data.main.humidity;
			var windSpeed = data.wind.speed;
			var clouds = data.clouds.all;
			var icon = data.weather[0].icon;
			var weather = data.weather[0].main;
			var fahrenheit = celsius * (9/5) + 32;
			var roundedF = fahrenheit.toFixed(2);

			// hide the celsius temperature on first click
			$('#celsius').css('display','none');

			$("#name").html(name + ', ');
			$("#country").html(country);
			$("#celsius").html(celsius + '&#8451');
			$("#fahrenheit").html(roundedF + '&#8457');
			$("#icon").html('<img src="' + icon + '">');
			$("#weather").html(weather);
			$("#humidity").html(humidity + "%");
			$('#windSpeed').html(windSpeed + "mph");
			$('#clouds').html(clouds + '%');

		}).fail(function(error){
			console.log('fail(): ' + error);
		})
	}
});
