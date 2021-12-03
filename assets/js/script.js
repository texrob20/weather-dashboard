var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchHistory = JSON.parse(localStorage.getItem("citySearchHistory"));
var cityHistoryEl = document.getElementById("city-buttons");
var citySelect = "";
var checkPrevious = true;

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

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelectMinus + "&APPID=ca0f1bc12f401f207d2783ba0f9c8ba8";
  
  fetch(apiUrl).then(function(response){
      if (response.ok) {
          response.json().then(function(data){
          console.log(data);
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

function storeCities(citySelect){
    citySearchHistory.push(citySelect);
    console.log(citySearchHistory);
    localStorage.setItem('citySearchHistory', JSON.stringify(citySearchHistory));
};

function showHistory(){
    cityHistoryEl.innerHTML ="";
    for (var i=0; i<citySearchHistory.length; i++){
    var showCities = document.createElement("button");
    showCities.setAttribute("type", "submit");
    showCities.setAttribute("class", "col-8 btn btn-info align-self-center");
    showCities.setAttribute("value", citySearchHistory[i]);
    showCities.innerHTML = citySearchHistory[i];
    cityHistoryEl.append(showCities);    
}};

showHistory();

$(".btn-info").click(function() {
    checkPrevious = true;
    citySelect = $(this).val();
    getCityResponse(citySelect);
  });

userFormEl.addEventListener("submit", formSubmitHandler);