var citySearch = $("#citySearch").value;

var getWeather = function(searchValue) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial&appid=8434e8bfd77beadb75981ba4664cc7c8";
    
        fetch (apiUrl).then(function(response) {
            response.json().then(function(data) {

               for (var i=0; i < (data.list.length); i += 8) {

                console.log(data);

                    $(".fiveDays").append(
                    `
                    <h4>${data.list[i].dt_txt}</h4>
                    <p><img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png"> </img </p> 
                    <p>Temp: ${data.list[i].main.temp} °F </p>
                    <p>Humidity: ${data.list[i].main.humidity} %</p>  
                    
                    `)
                }
            });

            })
        }

    getWeather("Phoenix");
       

function todaysWeather(searchValue) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=8434e8bfd77beadb75981ba4664cc7c8";
    
    fetch (apiUrl).then(function(response) {
        response.json().then(function(data) {

            $(".weatherContainer").append(
                `
                <h1>${searchValue} ${moment().format("MM/DD/YYYY")} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></img> </h1>
                <p>Temperature: ${data.main.temp} °F</p> 
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed}</p>

                `              
                )

                getUVIndex (data.coord.lat, data.coord.lon);
            
});


})

}
todaysWeather("Phoenix");

function getUVIndex(lat, long) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon=" + long  +"&appid=8434e8bfd77beadb75981ba4664cc7c8";
    
    fetch (apiUrl).then(function(response) {
        response.json().then(function(data) {

            $(".weatherContainer").append(`
            
            <p> UV Index: ${data.value}</p>
            `
            )
   
        });

    })

    $(".saveButton").on("click", function() {
        var key = $(this).parent().attr("id");
        var value = $(this).siblings(".searchButton").val();
        localStorage.setItem(key, value); 
    });

}