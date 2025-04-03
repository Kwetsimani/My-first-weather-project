function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;
  let humidityElement = document.querySelector("#humidity");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let countryElement = document.querySelector("#country");
  let timeElement = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  countryElement.innerHTML = response.data.country;
  timeElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}"class="emoji-weather-main"/>`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "8984t7340f42162bbca6do3c12a02a1d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  console.log(apiUrl);
}
function getForecast(city) {
  let apiKey = "8984t7340f42162bbca6do3c12a02a1d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (weekday, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(weekday.time)}</div>
    <img src="${weekday.condition.icon_url}"class="weather-forecast-icon"/>
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        weekday.temperature.maximum
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        weekday.temperature.minimum
      )}°</span>
    </div>
  </div>
`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town");
