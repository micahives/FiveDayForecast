var searchButton = document.getElementById('search-button');

function renderCurrentWeather(weather) {
  var weatherContainer = document.querySelector("#weather-container");
  console.log(weather);

  // Create h2 for city name
  var city = document.createElement("h2");
  city.textContent = weather.name;
  weatherContainer.append(city);

  // Icon
  var icon = document.createElement("img");
  var iconObj = weather.weather[0].icon;
  var iconURL = `https://openweathermap.org/img/wn/${iconObj}@2x.png`;
  icon.setAttribute('src', iconURL);
  weatherContainer.append(icon);

  // Date <p>
  var date = document.createElement('p');
  var newDate = new Date(weather.dt * 1000).toLocaleDateString("en-US");
  date.textContent = "Date: " + newDate;
  weatherContainer.append(date);
  
  // Temp <p>
  var temp = document.createElement('p');
  temp.textContent = "Temp: " + weather.main.temp + " °F";
  weatherContainer.append(temp);

  // Humidity <p>
  var humidity = document.createElement('p');
  humidity.textContent = "Humidity: " + weather.main.humidity + "%";
  weatherContainer.append(humidity);

  // Wind <p>
  var wind = document.createElement('p');
  wind.textContent = "Wind: " + weather.wind.speed + " mph";
  weatherContainer.append(wind);

}

function renderForecastWeather(weather) {
  console.log(weather);
  for (var i = 0; i < 5; i ++) {
    var forecastContainer = document.querySelector("#forecast-container");
    var weatherDiv = document.createElement('div');
    var city = document.createElement("h2");
    city.textContent = weather.list[i * 8].main.temp;
    weatherDiv.append(city);
    forecastContainer.append(weatherDiv);
  }
}

// Fetch weather data for city
function fetchForecastWeather(query) {
  var apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2'
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=` + query + `&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderForecastWeather(data);
    });

}

function fetchCurrentWeather(query) {
  var apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2'
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + query + `&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentWeather(data);
      fetchForecastWeather(query);
    });

}

fetchCurrentWeather("Madison");
// fetchWeather("Madison");