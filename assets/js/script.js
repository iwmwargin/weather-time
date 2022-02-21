$(document).ready(function(){
  
var apiKey = "2c77fe7ff6a9a39fb2189af34c91631f";
var theForecast = $("#forecast");
var today = moment();
var date = today.format("dddd, MMMM Do, YYYY");


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
        let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      $("#main").css("border", "2px solid black");
      $("#city-date").text(`${cityName} (${date})`);
      $("#icon").empty();
      $("#icon").append($("<img>").attr("src", icon));
      $("#currentWeather").empty();
      $("#currentWeather").css("style", "list-style: none;");
      $("#currentWeather").append(`<li>Temperature: ${data.main.temp}°F</li>`);
      $("#currentWeather").append(`<li>Wind: ${data.wind.speed} MPH</li>`);
      $("#currentWeather").append(`<li>Humidity: ${data.main.humidity}%</li>`);
      forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
        console.log(data);
      });
}




});