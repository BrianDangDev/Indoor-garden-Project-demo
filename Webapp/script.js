const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {};
weather.temperature = {
  unit: "celsius",
};
const KELVIN = 273;

//API
const key = "API key";

//Check if browswe support geo location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML =
    "<p>Browswer doesn't support geolocation </p>";
}

//set user position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value} °<span>C</span></p>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function openNav() {
  document.getElementById("Info-tab").style.width = "100vw";
}

function closeNav() {
  document.getElementById("Info-tab").style.width = "0";
}

const soilmoisture_data = document.querySelector(".soilmoi p");
const soilmoisture_data_2 = document.querySelector(".soilmoi2 p");
const soilmoisture = {};
const soilmoisture_2 = {};

function GetSoilData() {
  api = `https://api.thingspeak.com/channels/channelID/feeds.json?results=2`;
  setInterval(function () {
    fetch(api)
      .then(function (response) {
        let data = response.json();
        return data;
      })
      .then(function (data) {
        console.log(data);
        soilmoisture.value = data.feeds[0].field3;
        soilmoisture_2.value = data.feeds[1].field4;
      })
      .then(function () {
        displaysoil();
        plantstatus(soilmoisture.value);
      });
  }, 1000);
}
function displaysoil() {
  soilmoisture_data.innerHTML = `${soilmoisture.value}`;
  soilmoisture_data_2.innerHTML = `${soilmoisture_2.value}`;
}

function plantstatus(rangeInput) {
 
    if (rangeInput >= 71) {
        document.getElementById("happy").style.display = "block";
        document.getElementById("sad").style.display = "none";
        document.getElementById("neutral").style.display = "none";
        document.getElementById("fine").style.display = "none";
       
    }  else if (rangeInput < 70 && rangeInput >= 50) {
      
        document.getElementById("fine").style.display = "block";
        document.getElementById("happy").style.display = "none";
        document.getElementById("sad").style.display = "none";
        document.getElementById("neutral").style.display = "none";
     
    } else if (rangeInput < 50 && rangeInput >= 30) {
        document.getElementById("neutral").style.display = "block";
        document.getElementById("fine").style.display = "none";
        document.getElementById("happy").style.display = "none";
        document.getElementById("sad").style.display = "none";
    
    } else {
        
 
    } 
}
document.addEventListener("DOMContentLoaded", GetSoilData());

function submitPoll(id){
  document.getElementById("my-form").disabled = true;
  setTimeout(function(){document.getElementById("my-form").disabled = false;},5000);
}


 