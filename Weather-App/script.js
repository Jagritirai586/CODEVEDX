
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const weatherResult = document.getElementById("weatherResult");
const forecast = document.getElementById("forecast");
const locationBtn = document.getElementById("locationBtn");

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

// Toggle theme
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark Mode";
    }
});

const API_KEY = "YOUR_API_KEY"; // replace with your open weatherMap API key
// Search button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeather(city);
});

// Enter key support
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(success, error);

});


// ================= WEATHER =================
async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        loading.style.display = "block";
        weatherResult.innerHTML = "";
        forecast.innerHTML = "";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        loading.style.display = "none";

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>

                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />

                <h3>${data.main.temp} °C</h3>

                <p><strong>${data.weather[0].main}</strong></p>

                <p>${data.weather[0].description}</p>

                <p>💧 Humidity: ${data.main.humidity}%</p>

<p>🌬 Wind Speed: ${data.wind.speed} m/s</p>

<p>🌡 Feels Like: ${data.main.feels_like} °C</p>

<p>🧭 Pressure: ${data.main.pressure} hPa</p>

<p>👁 Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>

<p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
})}</p>

<p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
})}</p>

 

          </div>
        `;

        // call forecast
        getForecast(city);

    } catch (error) {

        loading.style.display = "none";

        weatherResult.innerHTML = `
            <div class="error">
                ❌ ${error.message}
            </div>
        `;

        forecast.innerHTML = "";
    }
}
async function success(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {

        loading.style.display = "block";
        weatherResult.innerHTML = "";
        forecast.innerHTML = "";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather");
        }

        const data = await response.json();

        loading.style.display = "none";

        weatherResult.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>

                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

                <h3>${data.main.temp} °C</h3>

                <p><strong>${data.weather[0].main}</strong></p>

                <p>${data.weather[0].description}</p>

                <p>💧 Humidity: ${data.main.humidity}%</p>

                <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>

                <p>🌡 Feels Like: ${data.main.feels_like} °C</p>

                <p>🧭 Pressure: ${data.main.pressure} hPa</p>

                <p>👁 Visibility: ${(data.visibility / 1000).toFixed(1)} km</p>

                <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}</p>

              <p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit"
           })}</p>
            </div>
            `;

        getForecastByLocation(latitude, longitude);

    } catch (error) {

        loading.style.display = "none";

        alert(error.message);

    }
}
function error() {
    alert("Location access denied.");
}

async function getForecastByLocation(lat, lon) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Forecast not available");
        }

        const data = await response.json();

        displayForecast(data.list);

    } catch (error) {

        console.error(error);

    }
}

// ================= FORECAST =================
async function getForecast(city) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Forecast not available");
        }

        const data = await response.json();

        displayForecast(data.list);

    } catch (error) {
        console.error(error);
    }
}


// ================= DISPLAY FORECAST =================
function displayForecast(forecastList) {

    forecast.innerHTML = "<h2>5-Day Forecast</h2>";

    const dailyForecast = forecastList.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(day => {

        forecast.innerHTML += `
            <div class="forecast-card">
                <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>

                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" />

                <p>${day.main.temp} °C</p>

                <p>${day.weather[0].main}</p>
            </div>
        `;
    });
}