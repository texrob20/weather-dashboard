var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var citySearchHistory = JSON.parse(localStorage.getItem("citySearchHistory"));

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
      getCityResponse(city);
      // clear old content
      cityInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

var getCityResponse = function(language) {
  var citySelect = cityInputEl.value.trim();
  var citySelectMinus = citySelect.split(",")[0]; //removes state
  console.log(citySelect);

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelectMinus + "&APPID=ca0f1bc12f401f207d2783ba0f9c8ba8";
  
  fetch(apiUrl).then(function(response){
      if (response.ok) {
          response.json().then(function(data){
          console.log(data);
          storeCities(citySelect);
          });
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

userFormEl.addEventListener("submit", formSubmitHandler);