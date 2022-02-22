$(document).ready(function () {
  // setting terms for localStorage

  if (localStorage.getItem("Searchhistory")) {
    var searchHistory = JSON.parse(localStorage.getItem("Searchhistory"));
  } else {
    var searchHistory = [];
  }

 // global variables

  var apiKey = "2c77fe7ff6a9a39fb2189af34c91631f";
  var today = moment();
  var date = today.format("dddd, MMMM Do, YYYY");
  var home = "index.html";
  var recentHistory = document.querySelector("#last-search");

  // create click event for search bar

  $("#submitCity").click(function (event) {
    event.preventDefault();
    var cityName = $("#cityInput").val();
    returnWeather(cityName);
    storeSearchHistory(cityName);
    console.log(cityName);
  });

  // function that creates search history

  var renderSearchHistory = function () {
    recentHistory.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
      var button = document.createElement("button");
      button.setAttribute("class", "button btn btn-secondary");
      button.addEventListener("click", function (event) {
        //console.log(event.target.innerHTML)
        returnWeather(event.target.innerHTML);
      });
      button.innerHTML = searchHistory[i];
      recentHistory.appendChild(button);
      //console.log(searchHistory[i])
    }
  };

  // variable that stores history to localStorage
  var storeSearchHistory = function (search) {
    if (searchHistory.length >= 6) {
      searchHistory.pop();
    }
    searchHistory.unshift(search);
    //console.log(searchHistory)
    localStorage.setItem("Searchhistory", JSON.stringify(searchHistory));
    renderSearchHistory();
  };


  // function that grabs weather data and appends current weather
  function returnWeather(cityName) {
    if (cityName == "") {
      alert("Please enter a city or town!");
      return;
    }
    var queryUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey;
    //make request to url
    fetch(queryUrl)
      .then(function (response) {
        // request was successful
        return response.json();
      })
      .then(function (data) {
        var icon =
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $("#main").css("border", "2px solid black");
        $("#city-date").text(`${cityName} (${date})`);
        $("#icon").empty();
        $("#icon").append($("<img>").attr("src", icon));
        $("#currentWeather").empty();
        $("#currentWeather").css("style", "list-style: none;");
        $("#currentWeather").append(
          `<li>Temperature: ${data.main.temp}°F</li>`
        );
        $("#currentWeather").append(`<li>Wind: ${data.wind.speed} MPH</li>`);
        $("#currentWeather").append(
          `<li>Humidity: ${data.main.humidity}%</li>`
        );
        forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`;
        console.log(data);
        fetch(forecast)
          .then(function (response) {
            if (response.status != 200) {
              document.location.replace(home);
            } else return response.json();
          })
          .then(function (data) {
            $("#currentWeather").append(
              `<li>UV Index: ${data.current.uvi}</li>`
            );

            //   if (data.current.uvi < 4) {
            //    $("#currentWeather").attr("class", "badge badge-success");
            // }
            // else if (data.current.uvi < 8) {
            //     UVIndex.setAttribute("class", "badge badge-warning");
            // }
            // else {
            //     UVIndex.setAttribute("class", "badge badge-danger");
            // }
            console.log(data.current.uvi);

            fiveDay(data);
            console.log(data);
          });
      });
  }


  // function that populates the five day forecast
  function fiveDay(data) {
    $("#forecast").empty();

    let newCardContainerEl = $("<div>")
      .attr("id", "cardContainer")
      .attr("class", "row");

    for (i = 1; i <= 5; i++) {
      let icon =
        "http://openweathermap.org/img/w/" +
        data.daily[i].weather[0].icon +
        ".png";
      let currentTimeUTC = data.daily[i].dt;
      let currentTimeZoneOffset = data.timezone;
      let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
      let currentMoment = moment
        .unix(currentTimeUTC)
        .utc()
        .utcOffset(currentTimeZoneOffsetHours);

      let card = $("<div>").attr("class", "col bg-primary");
      let date = $("<p>").text(`${currentMoment.format("MMM Do YYYY")}`);
      let temp = $("<p>").text(`Temp: ${data.daily[i].temp.day}°F`);
      let wind = $("<p>").text(`Wind Speed: ${data.daily[i].wind_speed}MPH`);
      let humidity = $("<p>").text(`Humidity: ${data.daily[i].humidity}%`);
      let graphic = $("<img>").attr("src", icon);
      card.append(date);
      card.append(graphic);
      card.append(temp);
      card.append(wind);
      card.append(humidity);
      newCardContainerEl.append(card);
    }
    $("#forecast").append(newCardContainerEl);
  }

});
