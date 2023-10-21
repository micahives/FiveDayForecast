// Stores items from renderSearchHistory()
var searchHistoryItems = [];

// Renders the current weather data as a card
function renderCurrentWeather(weather) {
  var weatherContainer = document.querySelector("#weather-container");
  weatherContainer.setAttribute('class', "col-6 border border-black rounded");
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
  date.textContent = newDate;
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

  const weatherJSON = JSON.stringify(weather);
  localStorage.setItem(`weatherData_${weather.name}`, weatherJSON);
}

// Renders the forecast data as cards 
function renderForecastWeather(weather) {
  console.log(weather);
  for (var i = 0; i < 5; i ++) {
    var forecastContainer = document.querySelector("#forecast-container");
    var weatherDiv = document.createElement('div');
    weatherDiv.setAttribute('class', 'col-lg-2 col-md-4 col-sm-3 border border-black rounded m-4 p-3 fixed-size-div');

    // Get the date
    var date = document.createElement('p');
    // Data is listed every 3 hours, get every '8th' index ie. 0, 8, 16, 24... to get new day weather
    var newDate = new Date(weather.list[i * 8].dt * 1000).toLocaleDateString("en-us");
    date.textContent = newDate;

    // Get the icon
    var icon = document.createElement("img");
    var iconObj = weather.list[i * 8].weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${iconObj}@2x.png`;
    icon.setAttribute('src', iconURL);

    // Get the temp
    var temp = document.createElement('p');
    temp.textContent = "Temp: " + weather.list[i * 8].main.temp + " °F";

    // Get the humidity
    var relHumid = document.createElement('p');
    relHumid.textContent = "Humidity: " + weather.list[i * 8].main.humidity + "%";

    // Get the wind
    var wind = document.createElement('p');
    wind.textContent = "Wind: " + weather.list[i * 8].wind.speed + " mph";

    weatherDiv.append(date, icon, temp, relHumid, wind);
    forecastContainer.append(weatherDiv);
  }
  const forecastJSON = JSON.stringify(weather);
  localStorage.setItem(`forecastData_${weather.city.name}`, forecastJSON);
}

// Fetches five day weather forecast
function fetchForecastWeather(query) {
  var apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2'
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=` + query + `&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderForecastWeather(data);
      // Pass retrieved data to the renderSearchHistory function to be used as parameters for later retrieval
      renderSearchHistory(data);
    });


}

// Fetches current weather data
function fetchCurrentWeather(query) {
  var apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2'
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=` + query + `&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentWeather(data);
      // Pass retrieved data to the renderSearchHistory function to be used as parameters for later retrieval
      renderSearchHistory(data);
    });

}

// Removes child HTML elements from weatherContainer when a new search is performed
function clearWeatherContainer() {
  var weatherContainer = document.querySelector("#weather-container");

  if (weatherContainer.children.length > 0) {
    weatherContainer.innerHTML = '';
  }
}

// Removes child HTML elements from forecastContainer when a new search is performed
function clearForecastContainer() {
  var forecastContainer = document.querySelector('#forecast-container');

    if (forecastContainer.children.length > 0) {
      forecastContainer.innerHTML = '';
    }
}

// Adds city name to searched list as a button that will render...
// the city's weather + five day forecast when clicked
function renderSearchHistory(weatherData, forecastData) {
  var searchHistory = document.getElementById('searched-list');

  // Ensures that the city name is not blank
  if (weatherData && weatherData.name) {
    var searchHistoryItem = {
      city: weatherData.name,
      weather: weatherData,
    };

      var listItem = document.createElement('li');
      listItem.textContent = searchHistoryItem.city;
      listItem.setAttribute('class', 'btn btn-primary mt-2');

      listItem.addEventListener('click', function() {
          clearWeatherContainer();
          clearForecastContainer();

          renderCurrentWeather(searchHistoryItem.weather);

          const forecastData = JSON.parse(localStorage.getItem(`forecastData_${searchHistoryItem.city}`));
          renderForecastWeather(forecastData);
    });
      searchHistory.appendChild(listItem);
    }
}

// Event handler for search form for submit button/search button
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var cityName = document.getElementById('search-input').value;

  if (cityName) {
      clearWeatherContainer();
      clearForecastContainer();
      fetchCurrentWeather(cityName);
      fetchForecastWeather(cityName);
  } else {
      alert('Please enter a city name');
  }
});

