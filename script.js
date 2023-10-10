const apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2';
var weatherContainer = document.getElementById('weather-container');
var searchButton = document.getElementById('search-button');

function getApi() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            for (var i =0; i < data.length; i++) {
                const weatherInfo = document.getElementById('weather-info');
                const firstForecast = data.list[0];
                const temperature = firstForecast.main.temp;
                const description = firstForecast.weather[0].description;
                const html = `<p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
                weatherInfo.innerHTML = html;
                console.log("success!")
            }
    })
        .catch(error => {
            console.error('Error fetching weather data:', error);
    });
}

searchButton.addEventListener('click', getApi);