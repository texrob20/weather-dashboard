## Weather Dashboard
GIVEN a weather dashboard with form inputs:

- WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history
- WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
- WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
- WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
- WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

## Built With
- Javascript - JQuery, Moment js
- CSS Styling - Bootstrap, Google Fonts
- HTML
- Server-side APIs - Open Weather Map

## Weather Dashboard
The jumbotron contains the name of the app and the current date.

## Search By City
This section allows the user to input a city and the app will search for the corresponding city in Open Weather Map database using an API.  Once the API returns the data, the latitude and longitude for the city are pulled and used for a second API call to retrieve the 7-day forecast for the city.  

## Previous Searches
Under the city search area, previous searches are displayed as buttons.  The user can click a button to display information for that city.  This area will only show previous searches that are stored in local storage.  The app checks to see if a new search matches a previous search and does not add it to the list of buttons.  In addition, if a button is clicked, it will not be duplicated in the previous search area.

## Current Day Forecast
The app displays the city and the current date with an icon for the weather forecast.  Icon is retrieved from Open Weather Map icon database and correlated to the 7-day forecast weather.icon array.  Next the app displays the temperature in Farenheit, the wind in miles per hour, the humidity, and the U/V index.  The U/V index is checked to determine of a dangerour u/v condition exists.

## 5-Day Forecast
The app displays the 5-day forecast under the current day forecast.  For each day, the app displays the date, weather icon (as described above), the temperature, the wind, and the humidity.

## Demo
<img src=https://github.com/texrob20/weather-dashboard/blob/main/assets/images/weather-dashboard.png>

## Deployed App
https://texrob20.github.io/weather-dashboard/