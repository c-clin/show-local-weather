

$(document).ready(function(){
$body = $("body");

	$(document).on({
	    ajaxStart: function() { $body.addClass("loading"); },
	    ajaxStop: function() { $body.removeClass("loading"); }    
	});

	var demo = $('#demo');
	var getLocationButton = $('#button');
	var tempToggle = $('.tempToggle');
	var latitude;
	var longitude;

	getLocationButton.on('click', getLocation);



	tempToggle.on('click', toggleTemp);



	// toggle fahrenheit and celsius
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
			var celsius = data.main.temp;
			var icon = data.weather[0].icon;
			var weather = data.weather[0].main;
			var description = data.weather[0].description;
			var fahrenheit = celsius * (9/5) + 32;
			var roundedF = fahrenheit.toFixed(2);

			$('#celsius').css('display','none');

			$("#name").html(name + ', ');
			$("#country").html(country);
			$("#celsius").html(celsius + '&#8451');
			$("#fahrenheit").html(roundedF + '&#8457');
			$("#icon").html('<img src="' + icon + '">');
			$("#weather").html(weather);





		}).fail(function(error){
			console.log('fail(): ' + error);
		})
	}
});




