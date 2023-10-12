var weatherContainer = document.getElementById('weather-container');
var searchButton = document.getElementById('search-button');

function getWeather() {
  console.log("Hello!");
  const apiKey = 'd3d82e6a2d8834ff83e6cab9c08ac5c2';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // for (var i = 0; i < data.length; i++) {
      //   //Creating a h3 element and a p element
      //   var userName = document.createElement('h3');
      //   var userUrl = document.createElement('p');

      //   //Setting the text of the h3 element and p element.
      //   userName.textContent = data[i].login;
      //   userUrl.textContent = data[i].url;

      //   //Appending the dynamically generated html to the div associated with the id="users"
      //   //Append will attach the element as the bottom most child.
      //   usersContainer.append(userName);
      //   usersContainer.append(userUrl);
      });
};

searchButton.addEventListener('click', getWeather);
