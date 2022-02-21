var apiKey = "2c77fe7ff6a9a39fb2189af34c91631f";
var currentWeather = $("#currentWeather");
var searchButton = document.querySelector("#submitCity");
var searchInput = document.getElementById("cityInput");
var theForecast = $("#forecast");

$("#submitCity").click(function (event) {
  event.preventDefault();
  var cityName = $("#cityInput").val();
  returnWeather(cityName);
  console.log(cityName);
  // returnForecast(cityName);
});

function returnWeather(cityName) {
  if(cityName == "") {
    alert("Please enter a city or town!");
    return
  }
  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    apiKey;
  //make request to url
  fetch(queryUrl).then(function (response) {
    // request was successful
      return response.json()})
      .then(function (data) {
        displayWeather(data);
        console.log(data);
      });
}

function displayWeather() {
  
}

searchButton.addEventListener("keyup", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitCity").click();
  }
})
