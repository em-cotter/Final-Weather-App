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

function displayForecast(response){
  console.log(response)
  let forecastElement= document.querySelector("#forecast")
  let forecastHTML = "";

let weekdays= ["Thu", "Fri", "Sat","Sun","Mon"]
weekdays.forEach(function (day) {
  forecastHTML =  forecastHTML +=
`<div class="weekday">${day}</div>
        <div class="row frame">
       <div class="col-3">High:0°C</div>
       <div class="col-3 ">Rainfall:17%</div>
       <div class="col-3">Low:-5°C</div>
       <div class="col-3">Wind:5 km/h</div>
   </div>     
  </div>
<br/>`
});
  forecastElement.innerHTML= forecastHTML
 
}

function getForecast(coordinates){
console.log(coordinates)
let apiKey = "30b4b8df96ab8adabf4f389d73097df8";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

console.log(apiUrl)
axios.get(apiUrl).then(displayForecast)
}

function showWeather(response) {
  
  let city = document.querySelector("#changeCity");
  city.innerHTML=`${response.data.name}`
  let temp = document.querySelector(`#current-temp`);
  roundCelciusTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${roundCelciusTemp}°C`;

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

  getForecast(response.data.coord)
}

function search(city){
  let apiKey = "30b4b8df96ab8adabf4f389d73097df8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#inputPassword");
  city.innerHTML = `${input.value}`;
search (input.value)
  
}



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

function showFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp= (roundCelciusTemp * 9/5) + 32 ;
  celciusLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
let temp = document.querySelector(`#current-temp`);
temp.innerHTML=`${Math.round(fahrenheitTemp)}°F`
}

function showCelcius(event){
  event.preventDefault()
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector(`#current-temp`);
  temp.innerHTML = `${roundCelciusTemp}°C`
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
let city = document.querySelector("#changeCity");


let roundCelciusTemp= null;

let fahrenheitLink= document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", showFahrenheit)

let celciusLink=document.querySelector("#celcius-link")
celciusLink.addEventListener("click", showCelcius)

search("Cologne")
