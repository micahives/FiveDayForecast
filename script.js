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

  // Sends current weather to local storage
  localStorage.setItem('currentWeather', JSON.stringify(weather));
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

    // Sends forecast weather to local storage
    localStorage.setItem('forecastWeather', JSON.stringify(weather));
  }
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
      fetchForecastWeather(query);
      renderSearchHistory();
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

// Sets searched city to local storage and adds city name to searched list as a button that will render...
// the city's weather + five day forecast when clicked
function renderSearchHistory() {
  var searchHistory = document.getElementById('searched-list');

  var currentWeather = JSON.parse(localStorage.getItem('currentWeather'));
  var forecastWeather = JSON.parse(localStorage.getItem('forecastWeather'));

  if (currentWeather && forecastWeather) {

    var searchHistoryItem = {
      city: currentWeather.name,
      weather: currentWeather,
      forecast: forecastWeather
    };

    // Checks if a city is in the search history to avoid adding a city more than once
    var isCityInHistory = searchHistoryItems.some(function(item) {
      return item.city === searchHistoryItem.city;
    });

    if (!isCityInHistory) {
      searchHistoryItems.push(searchHistoryItem);

      var listItem = document.createElement('li');
      listItem.textContent = searchHistoryItem.city;
      listItem.setAttribute('class', 'btn btn-primary mt-2');
      // Button styling for list items
      // listItem.style.cursor = 'pointer';
      // listItem.style.padding = '5px';
      // listItem.style.border = '1px solid #ccc';
      // listItem.style.backgroundColor = '#f0f0f0';

      listItem.addEventListener('click', function() {
          clearWeatherContainer();
          clearForecastContainer();
          renderCurrentWeather(searchHistoryItem.weather);
          renderForecastWeather(searchHistoryItem.forecast);
    });
      searchHistory.appendChild(listItem);
    }
  }
}

// Event handler for search form
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var cityName = document.getElementById('search-input').value;

  if (cityName) {
      clearWeatherContainer();
      clearForecastContainer();
      fetchCurrentWeather(cityName);
      renderSearchHistory();
  } else {
      alert('Please enter a city name');
  }
});
