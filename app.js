function getWeather() {
  const APIkey = `323921fc987fe4044a0fd11c87c901e6`;
  const city = document.querySelector(".city").value;

  if (!city) {
    alert("Please Enter A city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;

  fetch(currentWeatherUrl).then((response) => {
    response
      .json()
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        console.error("Error Fetching Current Weather");
        alert("Could Not find Data Please Try Again");
      });
  });

  fetch(forecastUrl).then((response) => {
    response
      .json()
      .then((data) => {
        displayHourlyForecast(data.list);
      })
      .catch((error) => {
        console.error("Error Fetching Forecast Weather");
        alert("Could Not find Forecast Data Please Try Again");
      });
  });
}
function displayWeather(data) {
  const tempDivInfo = document.querySelector(".temp");
  const weatherIcon = document.querySelector(".weather-img");

  const weatherInfoDiv = document.querySelector(".weather-info");
  const hourlyForecastDiv = document.querySelector(".forecast");

  tempDivInfo.innerHTML = "";
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";

  if (data.cod !== 200) {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    return;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.querySelector(".forecast");

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.querySelector(".weather-img");
  weatherIcon.style.display = "block";
}
