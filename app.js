const input = document.getElementById("input")
const button = document.getElementById("btn")
const alarm = document.querySelector(".alert")
let city;

window.addEventListener("load", ()=>{
    input.focus()
})

button.addEventListener("click", ()=> {
    if (input.value.trim() != "") {
        city = input.value
        console.log(city);
        input.value = ""
        input.focus()
        getWeatherInfo()
    }
})

input.addEventListener("keydown", (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
        button.click() 
    }
})

const API_KEY = "b57eb3897ee43736a71e86a7d7f99e3d"

const getWeatherInfo = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=tr`
    
    try {
        const response = await fetch(URL)
        // console.log(response);
        if (!response.ok) {
            throw new Error(`Something went wrong:${response.status}`)
        }
        const data = await response.json()
        console.log(data);
        renderInfo(data)
    } catch (error) {
            alarm.innerHTML = `"${city}" adında bir şehir bulunamadı!..`
       
        // console.log(error);
    }
}

const cityList = document.querySelector(".city-list")
let cities = []

const renderInfo = (data) => {
    const temperature = Math.round(data.main.temp - 273.15)
    let cityName = data.name

    alarm.innerHTML = ""
    
    if (data.name.endsWith(" Province")) {
        cityName = data.name.replace(" Province", "")
    }
    
    if (cities.includes(data.name)) {
        alert(`Daha önce ${cityName} hakkında sorgulama yapmıştınız!..`)
        return
    }
    cities.push(data.name)
    
    cityList.innerHTML += `
    <li class="city-weather">
    <p class="city-name">
    ${cityName} <span>${data.sys.country}</span>
    </p>
    <h1 class="city-temprature">${temperature} <span>°C</span></h1>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="img">
    <p class="description">${data.weather[0].description}</p>
    </li>
    `
}







// let cityWeather = document.createElement("li")
// cityWeather.classList.add("city-weather")
// cityList.appendChild(cityWeather)

// let cityName = document.createElement("p")
// cityName.classList.add("city-name")
// cityWeather.appendChild(cityName)

// let cityTemprature = document.createElement("h1")
// cityTemprature.classList.add("city-temprature")
// cityWeather.appendChild(cityTemprature)

// let weatherIcon = document.createElement("img")
// weatherIcon.classList.add("weather-icon")
// cityWeather.appendChild(weatherIcon)

// let description = document.createElement("p")
// description.classList.add("description")
// cityWeather.appendChild(description)