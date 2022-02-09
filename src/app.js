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

function formatDay(timestamp){
let date= new Date(timestamp*1000 );
let day= date.getDay()
  let days=["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
return days[day]
}

function displayForecast(response){
  let forecast=response.data.daily
  let forecastElement= document.querySelector("#forecast")
  let forecastHTML = "";


forecast.forEach(function (forecastDay, index) {
  if (index<5){
  forecastHTML =  forecastHTML +=
`<div class="weekday">${formatDay(forecastDay.dt)}</div>
        <div class="row frame">
       <div class="col-3">High:${Math.round(forecastDay.temp.max)}°C</div>
       <div class="col-4 ">Humidity:${Math.round(forecastDay.humidity)}%</div>
       <div class="col-2">Low:${Math.round(forecastDay.temp.min)}°C</div>
       <div class="col-3">Wind:${Math.round(forecastDay.wind_speed*3.6)}km/h</div>
   </div>     
  </div>
<br/>`}
});
  forecastElement.innerHTML= forecastHTML
 
}

function getForecast(coordinates){

let apiKey = "30b4b8df96ab8adabf4f389d73097df8";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`


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





let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
let city = document.querySelector("#changeCity");


let roundCelciusTemp= null;





search("Cologne")
