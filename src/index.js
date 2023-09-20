function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}<span>°C</span>`;

  document.querySelector("#humidity").textContent = ` ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").textContent = ` ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "15b581a382414a41eb9d17a78212a59c";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

displayForecast();

let form = document.querySelector("#counDetails");
form.addEventListener("submit", search);

let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];

h2.innerHTML = `${day}, ${month} ${date}, ${year} | ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `

    <div class="col-2">
      <ul>
        <li class="day">
          <span id="weather-forecast-date">${day}</span>
        </li>

        <img
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt=""
          width="42"
        />

        <li>
          <span id="weather-forecast-temperature">20°C</span>
        </li>
      </ul>
    </div>
  

`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}
