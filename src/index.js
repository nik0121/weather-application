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

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];

  days.forEach(function(day){
    
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="weather-forecast-date">${day}</div> 
    <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="36" />
    <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">12°</span>
    </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  city.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  date.innerHTML = formattedDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
