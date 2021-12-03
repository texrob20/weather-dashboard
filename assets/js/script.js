// adds current date to jumbotron
var currentDay= moment().format('dddd, MMMM DD, YYYY');
$("#currentDay").text(currentDay);


var getCityResponse = function(language) {
  var citySelect ="";

  var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + citySelect + "&APPID=ca0f1bc12f401f207d2783ba0f9c8ba8";
  
  fetch(apiUrl).then(function(response){
      if (response.ok) {
          response.json().then(function(data){
          console.log(data);
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