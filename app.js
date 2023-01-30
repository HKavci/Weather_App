const input = document.getElementById("input")
const button = document.getElementById("btn")
let city;

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

const getWeatherInfo = async () => {
    const API_KEY = "b57eb3897ee43736a71e86a7d7f99e3d"
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`Something went wrong:${response.status}`)
        }
        const data = await response.json()
        console.log(data);
        renderInfo(data)
    } catch (error) {
        console.log(error);
    }
}

const cityList = document.querySelector(".city-list")

const renderInfo = (data) => {
    const temperature = Math.round(data.main.temp - 273.15)
    console.log(temperature)

    let cityName = data.name

    if (data.name.endsWith(" Province")) {
        cityName = data.name.replace(" Province", "")
    }

    cityList.innerHTML += `
        <li class="city-weather">
            <p class="city-name">
                ${cityName} ${data.sys.country}
            </p>
            <h1 class="city-temprature">${temperature} °C</h1>
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