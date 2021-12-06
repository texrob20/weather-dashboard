var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchHistory = [];
var cityHistoryEl = document.getElementById("city-buttons");
var cityWeatherEl = document.getElementById("city-weather");
var fiveDayRow = document.getElementById("five-day-row");
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
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var fiveday =  "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon=" + data.coord.lon +
            "&exclude=minutely,hourly,alert&units=imperial&appid=ca0f1bc12f401f207d2783ba0f9c8ba8";
          fetch(fiveday).then(function(response){
          if (response.ok) {
              response.json().then(function(data){
              cityData = data;
              console.log(cityData);
              showCityData();
              });          
          } else {
            alert("Error:" + response.statusText);
          }
        });
          if (checkPrevious === false){
          storeCities(citySelect);
          }});          
      } else {
        alert("Error:" + response.statusText);
      }
  });
};

function fiveDayOutlook () {
  var fiveDayEl = "";  
  fiveDayRow.textContent = "";
  $("#five-day-row").append('<div class="col-12"><h3 class="font-weight-bold">5-Day Forecast:</h3></div>');
  for (i=1; i<6; i++){
    var weatherIcon = "src=http://openweathermap.org/img/wn/" + cityData.daily[i].weather[0].icon + "@2x.png";  
    fiveDayEl = $('<div class="row col-2 bg-success">');
    weatherPic = $('<div class="col-12 d-flex justify-content-center"><img ' + weatherIcon + '></></div>');
    dateBlock = $('<div class="col-12 m-1 p-2 font-weight-bold text-center">' + moment().add(i, 'day').format('MM/DD/YYYY') + '</div>');
    tempBlock = $('<div class="col-12 m-1 p-2">Temp: '+ cityData.daily[i].temp.day + '&#8457</div>');
    windBlock = $('<div class="col-12 m-1 p-2">Wind: '+ cityData.daily[i].wind_speed + ' MPH</div>');
    humidityBlock = $('<div class="col-12 m-1 p-2">Humidity: ' + cityData.daily[i].humidity + '%</div>');
    fiveDayEl.append(dateBlock);
    fiveDayEl.append(weatherPic);    
    fiveDayEl.append(tempBlock);
    fiveDayEl.append(windBlock);
    fiveDayEl.append(humidityBlock);     
    $("#five-day-row").append(fiveDayEl);
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
  var cityDataEl = $('<div>');
  cityWeatherEl.textContent = "";
  document.getElementById("city-container").setAttribute("class", "border border-primary");
  var weatherIcon = "src=http://openweathermap.org/img/wn/" + cityData.current.weather[0].icon + "@2x.png";
  document.getElementById("city-selected").innerHTML = citySelect + " (" + moment().format('MM/DD/YYYY') + ") <img " + weatherIcon + " />";
  tempBlock = $('<div class="col-12 m-1 p-2">Temp: '+ cityData.current.temp + '&#8457</div>');
  windBlock = $('<div class="col-12 m-1 p-2">Wind: '+ cityData.current.wind_speed + ' MPH</div>');
  humidityBlock = $('<div class="col-12 m-1 p-2">Humidity: ' + cityData.current.humidity + '%</div>');
  if (cityData.current.uvi <=2){
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-success">' + cityData.current.uvi + '</span></div>');
  } else if (cityData.current.uvi <=5){
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-warning">' + cityData.current.uvi + '</span></div>');
  } else if (cityData.current.uvi <=7){
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-warning">' + cityData.current.uvi + '</span></div>');
  } else {
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-danger">' + cityData.current.uvi + '</span></div>');
  } 
  cityDataEl.append(tempBlock);
  cityDataEl.append(windBlock);
  cityDataEl.append(humidityBlock); 
  cityDataEl.append(uvIndexBlock);    
  $("#city-weather").append(cityDataEl);
  
  fiveDayOutlook();
}

showHistory();

$(".btn-info").click(function() {
    checkPrevious = true;
    citySelect = $(this).val();
    getCityResponse(citySelect);
  });

userFormEl.addEventListener("submit", formSubmitHandler);