const token = config.SECRET_API_KEY;

const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentWeatherItemsElement = document.getElementById('current-weather-items');
const timezoneElement = document.getElementById('time-zone');
const countryElement = document.getElementById('country');
const weatherForecastElement = document.getElementById('weather-forecast');
const currentTempElement = document.getElementById('current-temp');

const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sat'
];

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]



setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const twelveHourFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    console.log(minutes);
    if(minutes < 10){
        timeElement.innerHTML = twelveHourFormat + ':0' + minutes + '' + `<span id="am-pm">${ampm}</span>`;
        console.log(minutes);
    } else {
        timeElement.innerHTML = twelveHourFormat + ':' + minutes + '' + `<span id="am-pm">${ampm}</span>`;
    }

    
    dateElement.innerHTML = days[day] + ', ' + months[month] + ' ' + date

},1000)



const getWeatherData = () => {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=Imperial&appid=${token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);
        })

    });
}
getWeatherData()

const showWeatherData = (data) => {
    let {humidity, pressure, wind_deg, sunrise, sunset, wind_speed} = data.current;
    timezoneElement.innerHTML = data.timezone;
    console.log(data);

    currentWeatherItemsElement.innerHTML =
    `<div class="weather-item">
        <p>Humidity</p>
        <p>${humidity}%</p>
    </div>
    <div class="weather-item">
        <p>Pressure</p>
        <p>${pressure}</p>
    </div>
    <div class="weather-item">
        <p>Wind-Speed</p>
        <p>${wind_speed}</p>
    </div>
    <div class="weather-item">
        <p>Sun-Rise</p>
        <p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
    </div>
    <div class="weather-item">
        <p>Sun-Set</p>
        <p>${window.moment(sunset * 1000).format('HH:mm a')}</p>
    </div>`;

    let otherDayForecast = '';

    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempElement.innerHTML = 
            `
            <div class="today" id="current-temp" style="border:none">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" class="w-icon">
            <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="temp">night  ${day.temp.night}&#176;f</div>
            <div class="temp">day  ${day.temp.day}&#176;f</div>
            </div> 
            `
        } else {
            otherDayForecast += 
            `<div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">night  ${day.temp.night}&#176;f</div>
                <div class="temp">day  ${day.temp.day}&#176;f</div>
            </div>`
        }
    });
    weatherForecastElement.innerHTML = otherDayForecast;
}

// function getWeather() {
    
//     const getTemp = () => {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             let lat = position.coords.latitude;
//             let long = position.coords.longitude;
//             console.log(lat);
//             console.log(long);
        
//         fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ long + '&appid=' + token)
//         .then(response => response.json())
//         .then(json => displayTemp(Math.floor((json.main.temp - 273.15) * 9/5 + 32)))
//         .catch(err => console.log(err));
//     });
//     }
//     const getRain = () => {
//         fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.75&lon=-118.31&appid=' + token)
//         .then(response => response.json())
//         .then(json => displayWeather(json.weather[0].description))
//         .catch(err => console.log(err));
//     }
//     const getLocation = () => {
//         fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.75&lon=-118.31&appid=' + token)
//         .then(response => response.json())
//         .then(json => displayLocation(json.name))
//         .catch(err => console.log(err));
//     }
//     const getData = () => {
//         fetch('https://api.openweathermap.org/data/2.5/weather?lat=33.75&lon=-118.31&appid=' + token)
//         .then(response => response.json())
//         .then(json => console.log(json))
//         .catch(err => console.log(err));
//     }



//     const displayTemp = (temp) => {
//         document.getElementById('temp').innerHTML = temp;
//     }
//     const displayWeather = (weather) => {
//         document.getElementById('weather').innerHTML = weather;

//     }
//     const displayLocation = (location) => {
//         document.getElementById('location').innerHTML = location;

//     }
//     getData();

//     getLocation();
    
//     getRain();

//     getTemp();
// }

// getWeather();

