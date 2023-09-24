function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let currentDate = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `${minutes}`;
  }

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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${currentDate}, ${year} |  ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day];
}


function displayForecast(response) {
  let weatherforecast = response.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
 

  weatherforecast.forEach(function (weatherForecastDay, index) {
    if (index < 6) {

    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="weather-forecast-date">${formatDay(weatherForecastDay.dt)}</div> 
    <img src="http://openweathermap.org/img/wn/${weatherForecastDay.weather[0].icon}@2x.png" alt="" width="36" />
    <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">${Math.round(weatherForecastDay.temp.max)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(weatherForecastDay.temp.min)}°</span>
    </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  temperature.innerHTML = `${Math.round(response.data.main.temp)}°c`;
  city.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  date.innerHTML = formattedDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#search-text-input");
  search(cityInput.value);
}

search("Philippines");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
