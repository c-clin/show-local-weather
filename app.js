

$(document).ready(function(){
$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading"); },
    ajaxStop: function() { $body.removeClass("loading"); }    
});
	
	var demo = $('#demo');
	var getLocationButton = $('#button');
	var latitude;
	var longitude;

	getLocationButton.on('click', getLocation);

	// get the user's permission to access their current coordinates
	function getLocation() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showWeather);
		} else {
			demo.html('Geolocation is not supported by your browser.');
		}
	}

	function showWeather(position){
		demo.innerHTML = 'Latitude: ' + position.coords.latitude + 
			'<br />Longitude: ' + position.coords.longitude;
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

	 	var url =  `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

		$.getJSON(url).done(function(data) {
			var name = data.name;
			var country = data.sys.country;			
			var temp = data.main.temp;
			var icon = data.weather[0].icon;
			var weather = data.weather[0].main;
			var description = data.weather[0].description;

			$("#name").html(name + ', ');
			$("#country").html(country);
			$("#temp").html(temp + '&#8451');
			$("#icon").html('<img src="' + icon + '">');
			$("#weather").html(weather);

			console.log(name, temp, country, icon, weather, description);
		}).fail(function(error){
			console.log('fail(): ' + error);
		})
	}
});



// &#8457  fahre



