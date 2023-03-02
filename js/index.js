// SEARCH
let searchInput = document.getElementById('search-input'),
    searchBtn = document.getElementById('search-btn');
// For Date Function
let dayHtml = document.getElementById("day"),
    dayMonth = document.getElementById('t-date'),
    tomorrowDay = document.querySelectorAll('.tomorrow-day'),
    tomorrowDate = document.querySelectorAll('.tomorrow-date');
// WEATHER DETAILS
    // TODAY (CURRENT DAY) -- FIRST DIV
    let city = document.querySelector('.city-name'),
        tTemp = document.getElementById('today-temp'),
        tIcon = document.querySelector('.t-weather-icon'),
        tWeatherStatus = document.querySelector('.t-weather-status'),
        humidity = document.getElementById('humidity'),
        wind = document.getElementById('wind'),
        direction = document.getElementById('direction');
    
    // UPCOMING DAYS (NEXT DAYS)
    let hDegree = document.querySelectorAll('.degree'),
        lDegree = document.querySelectorAll('.small'),
        tomWeatherStatus = document.querySelectorAll('.weather-status'),
        tomIcon = document.querySelectorAll('.weather-icon');


let result ;  // GLOBAL

async function getWeather(city = "muscat"){
    let apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3f8a7e22b4aa42f3a23144855230103&q=${city}&days=3&aqi=no&alerts=no`)
    result = await apiResponse.json()
    currentWeather()
    nextWeather()
    // return result;
}
getWeather()

// search
searchBtn.addEventListener('click', function () {
    search()
})
searchInput.addEventListener('keyup',()=>{
    search()
})
// can also use when using enter only
// searchInput.addEventListener('keyup',(e)=>{
//     if (e.key == 'Enter') {
//         search()        
//     }
// })
async function search() {
    let userSearch = await getWeather(searchInput.value)
    currentWeather(userSearch)
    // let userSearch = searchInput.value
    // getWeather(userSearch)
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"] 
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function currentWeather() {
    const d = new Date() // create a date instance

    dayHtml.innerHTML= days[d.getDay()];
    dayMonth.innerHTML = `${d.getDate()} ${months[d.getMonth()]}`;

    city.innerHTML = result.location.name;
    tTemp.innerHTML = `${result.current.temp_c}<sup>o</sup>C`;
    tWeatherStatus.textContent = result.current.condition.text;
    humidity.textContent = result.current.humidity;
    wind.textContent = result.current.wind_kph;
    direction.textContent = result.current.wind_dir;
    tIcon.setAttribute('src', `http:${result.current.condition.icon}`);
}

function nextWeather() {
    for (let i = 0; i < tomorrowDay.length; i++) {
        tomorrowDay[i].innerHTML = days[new Date(result.forecast.forecastday[i+1].date).getDay()]
        tomorrowDate[i].innerHTML = `${new Date(result.forecast.forecastday[i+1].date).getDate()} ${months[new Date(result.forecast.forecastday[i+1].date).getMonth()]}`

        hDegree[i].innerHTML = `${result.forecast.forecastday[i+1].day.maxtemp_c}<sup>o</sup>C`
        lDegree[i].innerHTML = `${result.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup>C`
        tomIcon[i].setAttribute('src',`http:${result.forecast.forecastday[i+1].day.condition.icon}`) 
        tomWeatherStatus[i].textContent = result.forecast.forecastday[i+1].day.condition.text
    }
}