var searchButton = document.getElementById('search-button');

function renderWeather(weather) {
  var weatherContainer = document.querySelector("#weather-container");
  console.log(weather);

  // Create h2 for city name
  // Create p for temp, humidity, wind, description
  var city = document.createElement("h2");
  city.textContent = weather.name;
  weatherContainer.append(city);
  
  var temp = document.createElement('p');
  temp.textContent = "Temp: " + weather.main.temp + " F";
  weatherContainer.append(temp);

  var humidity = document.createElement('p');
  humidity.textContent = "%RH: " + weather.main.humidity + " %";
  weatherContainer.append(humidity);

  var wind = document.createElement('p');
  wind.textContent = "Wind: " + weather.wind.speed + " mph, " + weather.wind.deg + " deg";
  weatherContainer.append(wind);

}

// Fetch weather data for city
function fetchWeather(query) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=d3d82e6a2d8834ff83e6cab9c08ac5c2';

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderWeather(data);
    });

}

fetchWeather();