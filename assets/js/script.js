var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchHistory = [];
var cityHistoryEl = document.getElementById("city-buttons");
var cityWeatherEl = document.getElementById("city-weather");
var fiveDayRow = document.getElementById("five-day-row");
var citySelect = "";
var checkPrevious = true;
var cityData = {};
var citySelectMinus = "";

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
      
      getCityResponse(city);
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

var getCityResponse = function(language) {
   
  citySelectMinus = citySelect.split(",")[0]; //removes state
  
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelectMinus + "&units=imperial&APPID=ca0f1bc12f401f207d2783ba0f9c8ba8";
  // checks for valid input
  fetch(apiUrl).then(function(response){
      if (response.ok) {
          response.json().then(function(data){
          // uses initial lat and long to send api request for full 7 day forcast
          var fiveday =  "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon=" + data.coord.lon +
            "&exclude=minutely,hourly,alert&units=imperial&appid=ca0f1bc12f401f207d2783ba0f9c8ba8";
          fetch(fiveday).then(function(response){
          if (response.ok) {
              response.json().then(function(data){
              cityData = data;
              showCityData();
              });          
          } else {
            alert("Error:" + response.statusText);
          }
        });
          // checks to see if city has been previous entered or clicked.
          checkHistory();  
          // If new city, adds to previous search list
          if (checkPrevious === false){
          storeCities(citySelect);
          }});          
      } else {
        alert("Error:" + response.statusText);
        return;
      }
  });
};
// displays 5 day outlook for selected city
function fiveDayOutlook () {
  var fiveDayEl = "";  
  fiveDayRow.textContent = ""; //resets display area
  $("#five-day-row").append('<div class="col-12"><h3 class="font-weight-bold p-2">5-Day Forecast:</h3></div>');
  for (i=1; i<6; i++){
    var weatherIcon = "src=https://openweathermap.org/img/wn/" + cityData.daily[i].weather[0].icon + "@2x.png";  
    fiveDayEl = $('<div class="row col-2 bg-success">');
    weatherPic = $('<div class="col-12 d-flex justify-content-center"><img ' + weatherIcon + '></></div>');
    dateBlock = $('<div class="col-12 m-1 p-2 font-weight-bold text-center"><h4>' + moment().add(i, 'day').format('MM/DD/YYYY') + '</h4></div>');
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
// checks to see if city was used as input before
function checkHistory(){
    for (var i=0; i<citySearchHistory.length; i++){
        if (citySearchHistory[i] == citySelectMinus || citySearchHistory[i] == citySelect){
          i = citySearchHistory.length;
          checkPrevious = true;
        } else {
          checkPrevious = false;         
    }}
}
// stores city input into local storage
function storeCities(citySelect){
    citySearchHistory.push(citySelect);
    localStorage.setItem('citySearchHistory', JSON.stringify(citySearchHistory));
    showHistory();
};
// displays previous cities searched that are stored in local storage
function showHistory(){
    cityHistoryEl.innerHTML ="";
    citySearchHistory = [];
    citySearchHistory = JSON.parse(localStorage.getItem("citySearchHistory"));
    // creates buttons for each previously searched city    
    for (var i=0; i<citySearchHistory.length; i++){
    var showCities = document.createElement("button");
    showCities.setAttribute("type", "submit");
    showCities.setAttribute("class", "col-8 btn btn-info p-2 m-1");
    showCities.setAttribute("value", citySearchHistory[i]);
    showCities.innerHTML = citySearchHistory[i];
    cityHistoryEl.append(showCities);    
}};

// displays current day weather information
function showCityData(){
  var cityDataEl = $('<div>');
  cityWeatherEl.textContent = "";
  document.getElementById("city-container").setAttribute("class", "border border-primary");
  var weatherIcon = "src=https://openweathermap.org/img/wn/" + cityData.current.weather[0].icon + "@2x.png";
  document.getElementById("city-selected").innerHTML = citySelect + " (" + moment().format('MM/DD/YYYY') + ") <img " + weatherIcon + " />";
  tempBlock = $('<div class="col-12 m-1 p-2">Temp: '+ cityData.current.temp + '&#8457</div>');
  windBlock = $('<div class="col-12 m-1 p-2">Wind: '+ cityData.current.wind_speed + ' MPH</div>');
  humidityBlock = $('<div class="col-12 m-1 p-2">Humidity: ' + cityData.current.humidity + '%</div>');
  // checks u/v index and colors text based on threat level
  if (cityData.current.uvi <=2){ //green is good
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-success rounded px-2">' + cityData.current.uvi + '</span></div>');
  } else if (cityData.current.uvi <=5){ //yellow is warning
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-warning rounded px-2">' + cityData.current.uvi + '</span></div>');
  } else if (cityData.current.uvi <=7){ //yellow is still warning
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-warning rounded px-2">' + cityData.current.uvi + '</span></div>');
  } else { //red is dangerous levels
    uvIndexBlock = $('<div class="col-12 m-1 p-2">U/V Index: <span class="bg-danger rounded px-2">' + cityData.current.uvi + '</span></div>');
  } 
  cityDataEl.append(tempBlock);
  cityDataEl.append(windBlock);
  cityDataEl.append(humidityBlock); 
  cityDataEl.append(uvIndexBlock);    
  $("#city-weather").append(cityDataEl);
  
  fiveDayOutlook();
}

//displays locally stored previous searches
showHistory();

//listens for click on previously searched city 
$(".btn-info").click(function() {
    //prevents duplicate saves of city when clicked from previous searches
    checkPrevious = true;  
    citySelect = $(this).val();
    getCityResponse(citySelect);
  });

//listens for the user to submit a city
userFormEl.addEventListener("submit", formSubmitHandler);