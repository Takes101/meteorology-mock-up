



function getWeather(cityName) {
    var apiCall = ""

    if (cityName !== "") {
        apiCall = currentConditions + apiKey + "&q=" + cityName

    } else {
        apiCall = currentConditions + apiKey + "&q=" + city

    }

    $.ajax({
        url: apiCall,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var feelslike = response.main.temp
        feelslike = (feelslike - 273.15) * 1.8 + 32
        feelslike = Math.floor(feelslike)
        city = response.name
        $("#current-weather").append("<div>" + feelslike + "</div>")
        $("#current-weather").append("<div>" + city + "</div>")
        fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`