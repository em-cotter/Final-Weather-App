let now = new Date();
let date = document.querySelector(".time");

let minutes = now.getMinutes();
let hours = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

function minute() {
  if (minutes < 10) {
    date.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    date.innerHTML = `${day} ${hours}:${minutes}`;
  }
}
minute();
let form = document.querySelector("form");
let city = document.querySelector("#changeCity");

function showWeather(response) {
  
  let city = document.querySelector("#changeCity");
  city.innerHTML=`${response.data.name}`
  let temp = document.querySelector(`#current-temp`);
  let roundTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${roundTemp}°C`;

  let lowTemp = document.querySelector(`#low`);
  let roundLowTemp = Math.round(response.data.main.temp_min);
  lowTemp.innerHTML = `Low: ${roundLowTemp}°C`;

  let highTemp = document.querySelector(`#high`);
  let roundHighTemp = Math.round(response.data.main.temp_max);
  highTemp.innerHTML = `High: ${roundHighTemp}°C`;

  let wind = document.querySelector(`#wind`);
  let windRound = Math.round(response.data.wind.speed*3.6);
  wind.innerHTML = `Wind: ${windRound} km/h`;

  let humidity = document.querySelector(`#humidity`);
  let humidityRound = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityRound}%`;
}
function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#inputPassword");
  city.innerHTML = `${input.value}`;

  let apiKey = "30b4b8df96ab8adabf4f389d73097df8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

form.addEventListener("submit", handleSubmit);

function useLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "30b4b8df96ab8adabf4f389d73097df8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getPosition(position) {
  navigator.geolocation.getCurrentPosition(useLocation);
}

let currentLocation = document.querySelector(`#current-location`);
currentLocation.addEventListener("click", getPosition);
