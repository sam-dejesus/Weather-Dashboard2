const searchBtn = $('#searchBtn')
const name = $('#name')
const input = $('#input')
const img = $('#img')
const status = $('#status')
const windSpeed = $('#windSpeed')
const temp  = $('#temp')
const feelsLike = $('#feelsLike')
const humid = $('#humid')
const low = $('#low')
const high = $('#high')

const forecast = $('#forecast5')

const today = $('#today')


var currentDate = dayjs()
var date = currentDate.format("dddd MMM. D, YYYY")

today.html(currentDate)

searchBtn.click(()=>{
    var city = input.val().trim();
    city = city.charAt(0).toUpperCase() + city.slice(1);

    var url = "http://api.openweathermap.org/geo/1.0/direct?q= "+ city + "&limit=1&appid=78da9311b6649705d4159cf6966655ff"
    fetch(url)
.then(response => response.json())
.then(data =>{
    var {lat, lon } = data[0]
    var latValue = lat;
    var lonValue = lon;
    var weather = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latValue + "&lon=" + lonValue + "&units=imperial&cnt=6&appid=78da9311b6649705d4159cf6966655ff"
    //

    fetch(weather)
    .then(response => response.json())
    .then(data =>{
        var cityName = data.city.name
        if(city == cityName){
          var icon = data.list[0].weather[0].icon;
          status.html("todays weather condition " + data.list[0].weather[0].description)
          windSpeed.html("the windspeed is " + data.list[0].wind.speed + " MPH")
          temp.html("the tempeture for today is " + data.list[0].main.temp + "℉")  
          feelsLike.html("it feels like " + data.list[0].main.feels_like + "℉")
          humid.html("The humidity is " + data.list[0].main.humidity+'%')
          low.html('the low tempeture for today is ' + data.list[0].main.temp_min)
          high.html('the high tempeture for today is ' + data.list[0].main.temp_min)

         img.attr("src", "http://openweathermap.org/img/wn/" + icon + ".png")
        name.html(cityName)
        for (var i = 1; i <= 5; i++){
            var icon2 = data.list[i].weather[0].icon;
            var temperature2 = data.list[i].main.temp;
            var windspeed2 = data.list[i].wind.speed;
            var humidity2 = data.list[i].main.humidity;
            currentDate = currentDate.add(1, 'day' )
    
            var h3 = $('<h3>').text(currentDate.format('M/DD/YY'))
            var p1 = $('<p>').text('Temp: '+ temperature2)
            var p2 = $('<p>').text('Windspeed: '+ windspeed2 +' MPH')
            var p3 = $('<p>').text('Humidity: '+humidity2 +'%')
            var img2 = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + icon2 + ".png")
            var div = $('<div>').addClass("forecast-day").append(h3, img2, p1, p2, p3)
            forecast.append(div)
        }
        console.log(data)
        } else{
            alert('City not found')
        }
    

        
    })


})
.catch(err =>{
    alert("Error fetching city data.")
})

})