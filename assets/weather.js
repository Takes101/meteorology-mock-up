var apiKey = "af8a8ca1fcafad947f106df614e7fb42";
var city="";
// variable declaration
var searchCity = $("#city-search");
var searchButton = $("#search-input");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];


function displayWeather(event){
  event.preventDefault();
  if(searchCity.val().trim()!==""){
      city=searchCity.val().trim();
      currentWeather(city);
  }
}
// Here we create the AJAX call
function currentWeather(city){
  // Here we build the URL so we can get a data from server side.
  var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
  $.ajax({
      url: queryURL,
      method:"GET",
  }).then(function(response){

      // parse the response to display the current weather including the City name. the Date and the weather icon. 
      console.log(response);
      //Dta object from server side Api for icon property.
      var weathericon= response.weather[0].icon;
      var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
      // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      var date=new Date(response.dt*1000).toLocaleDateString();
      //parse the response for name of city and concanatig the date and icon.
      $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
      // parse the response to display the current temperature.
      // Convert the temp to fahrenheit

      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
      // Display the Humidity
      $(currentHumidty).html(response.main.humidity+"%");
      //Display Wind speed and convert to MPH
      var ws=response.wind.speed;
      var windsmph=(ws*2.237).toFixed(1);
      $(currentWSpeed).html(windsmph+"MPH");
      // Display UVIndex.
      //By Geographic coordinates method and using appid and coordinates as a parameter we are going build our uv query url inside the function below.
      UVIndex(response.coord.lon,response.coord.lat);
      forecast(response.id);
      if(response.cod==200){
          sCity=JSON.parse(localStorage.getItem("cityname"));
          console.log(sCity);
          if (sCity==null){
              sCity=[];
              sCity.push(city.toUpperCase()
              );
              localStorage.setItem("cityname",JSON.stringify(sCity));
              addToList(city);
          }
          else {
              if(find(city)>0){
                  sCity.push(city.toUpperCase());
                  localStorage.setItem("cityname",JSON.stringify(sCity));
                  addToList(city);
              }
          }
      }

  });
}

function UVIndex(ln,lt){
  //lets build the url for uvindex.
  var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
  $.ajax({
          url:uvqURL,
          method:"GET"
          }).then(function(response){
              $(currentUvindex).html(response.value);
          });
}

function loadlastCity(){
  $("ul").empty();
  var sCity = JSON.parse(localStorage.getItem("cityname"));
  if(sCity!==null){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      for(i=0; i<sCity.length;i++){
          addToList(sCity[i]);
      }
      city=sCity[i-1];
      currentWeather(city);
  }

}

function clearHistory(event){
  event.preventDefault();
  sCity=[];
  localStorage.removeItem("cityname");
  document.location.reload();

}

$("#search-input").on("click",displayWeather);

$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);







// //taking in user input, and passing the value into a variable
// $(document).ready(function() {
//     $("#search-input").on("click", function(event) {
//     var userInput = $("#city-search").val()
//     console.log(userInput)
//     getWeather(userInput)

//     })
// })



// function getWeather(cityName) {
//     var apiCall = ""

//     if (cityName !== "") {
//         apiCall = currentConditions + apiKey + "&q=" + cityName

//     } else {
//         apiCall = currentConditions + apiKey + "&q=" + city

//     }

//     $.ajax({
//         url: apiCall,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response)
//         var feelslike = response.main.temp
//         feelslike = (feelslike - 273.15) * 1.8 + 32
//         feelslike = Math.floor(feelslike)
//         city = response.name
//         $("#current-weather").append("<div>" + feelslike + "</div>")
//         $("#current-weather").append("<div>" + city + "</div>")
//         fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`


//         $.ajax({
//             url: fiveDay,
//             method: "GET"
//           }).then(function(response) {
//             console.log(response)
      
//             var averageTemp = 0
//             var previousdate = ""
//             var count = 0
//             var results = 0
//             previousdate = moment().format("MM/DD/YYYY")
//             for (let index = 0; index < response.list.length; index++) {
//               var currentDate = moment(response.list[index].dt, "X").format(
//                 "MM/DD/YYYY"
//               )
//               var temp = response.list[index].main.temp
//               temp = (temp - 273.15) * 1.8 + 32
//               temp = Math.floor(temp)
//               console.log(currentDate)
//               console.log(temp)
      
//               if (previousdate === currentDate) {
//                 averageTemp = averageTemp + temp
//                 count++
//                 previousdate = currentDate
//               } else {
//                 results = averageTemp / count
//                 results = Math.floor(results)
//                 console.log("results:", results)
//                 var card = $("<div class = 'card col-sm-2'>")
      
//                 var div1 = $("<div class= 'card-header'>")
//                 div1.append("Date" + '' + currentDate)
//                 card.append(div1)
      
//                 var div2 = $("<div class= 'card-body'>")
//                 div2.append("Average Temperature:" + results)
//                 card.append(div2)
      
//                 $("#five-day").append(card)
      
//                 count = 0
//                 averageTemp = 0
//                 previousdate = currentDate
      
      
      
              
//               }
//             }
//           })
//         })
//       }


