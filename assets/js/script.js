var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchHistory = [];
var cityHistoryEl = document.getElementById("city-buttons");
var cityWeatherEl = document.getElementById("city-weather");
var citySelect = "";
var checkPrevious = true;
var cityData = {};

// adds current date to jumbotron
var currentDay= moment().format('dddd, MMMM DD, YYYY');
$("#currentDay").text(currentDay);

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    
    // get value from input element
    var city = cityInputEl.value.trim();
  
    if (city) {
      console.log(city);
      citySelect = cityInputEl.value.trim();
      checkPrevious = false;
      checkHistory(citySelect);
      getCityResponse(city);
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

var getCityResponse = function(language) {
   
  var citySelectMinus = citySelect.split(",")[0]; //removes state
  console.log(citySelect);

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelectMinus + "&units=imperial&APPID=ca0f1bc12f401f207d2783ba0f9c8ba8";
  
  fetch(apiUrl).then(function(response){
      if (response.ok) {
          response.json().then(function(data){
          cityData = data;
          console.log(cityData);
          showCityData();
          if (checkPrevious === false){
          storeCities(citySelect);
          }});          
      } else {
        alert("Error:" + response.statusText);
      }
  });
};

var fiveDayOutlook = function() {
  for (i=0; i<5; i++){

  }
}

function checkHistory(){
    for (var i=0; i<citySearchHistory.length; i++){
        if (citySearchHistory[i] === citySelect){
          i = citySearchHistory.length;
        } else {
            console.log("add to storage");
        }
    }
}

function storeCities(citySelect){
    citySearchHistory.push(citySelect);
    console.log(citySearchHistory);
    localStorage.setItem('citySearchHistory', JSON.stringify(citySearchHistory));
    showHistory();
};

function showHistory(){
    cityHistoryEl.innerHTML ="";
    var test = JSON.parse(localStorage.getItem("citySearchHistory"));
    if (test){
        citySearchHistory = JSON.parse(localStorage.getItem("citySearchHistory"));
    } else {
        citySearchHistory = [];
    };
    if (citySearchHistory) {
    for (var i=0; i<citySearchHistory.length; i++){
    var showCities = document.createElement("button");
    showCities.setAttribute("type", "submit");
    showCities.setAttribute("class", "col-8 btn btn-info p-2 m-1");
    showCities.setAttribute("value", citySearchHistory[i]);
    showCities.innerHTML = citySearchHistory[i];
    cityHistoryEl.append(showCities);    
}}};

function showCityData(){
  var cityDataEl = "";
  
  var weatherIcon = "src=http://openweathermap.org/img/wn/" + cityData.weather[0].icon + "@2x.png";
  document.getElementById("city-selected").innerHTML = citySelect + " (" + moment().format('MM/DD/YYYY') + ") <img " + weatherIcon + " />";
  var temp = cityData.main.temp;
  var wind = cityData.wind.speed + " MPH";
  var humidity = cityData.main.humidity + " %";
  var lat = cityData.coord.lat;
  var lon = cityData.coord.lon;
  cityDataEl = document.createElement("div");
  cityDataEl.setAttribute("class", "col-12 m-1 p-2");
  cityDataEl.innerHTML = "Temp: " + cityData.main.temp + "&#8457";
  cityWeatherEl.append(cityDataEl);
  cityDataEl = document.createElement("div");
  cityDataEl.setAttribute("class", "col-12 m-1 p-2");
  cityDataEl.innerHTML = "Wind: " + cityData.wind.speed + " MPH"
  cityWeatherEl.append(cityDataEl);
  cityDataEl = document.createElement("div");
  cityDataEl.setAttribute("class", "col-12 m-1 p-2");
  cityDataEl.innerHTML = "Humidty: " + cityData.main.humidity + " %"
  cityWeatherEl.append(cityDataEl);
  console.log(lat);
  console.log(lon);
}

showHistory();

$(".btn-info").click(function() {
    checkPrevious = true;
    citySelect = $(this).val();
    getCityResponse(citySelect);
  });

userFormEl.addEventListener("submit", formSubmitHandler);