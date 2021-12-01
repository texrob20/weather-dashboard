// adds current date to jumbotron
var currentDay= moment().format('dddd, MMMM DD, YYYY');
$("#currentDay").text(currentDay);

var getCityResponse = function(language) {
  
  var apiUrl = "https://api.openweather.com";
  
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