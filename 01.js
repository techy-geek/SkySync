const API_KEY = "1d888793ed150af62a11ccd5ba4f3a92";
document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "1d888793ed150af62a11ccd5ba4f3a92"; // <-- Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temp = data.main.temp;
                const wind = data.wind.speed;
                const humidity = data.main.humidity;
                const city = data.name;

               document.querySelector(".Temp").textContent = `Temperature is : ${Math.floor(temp)} °C`;
                document.getElementById("wind_speed").textContent = `Wind Speed : ${wind} m/s`;
                document.getElementById("Humidity").textContent = `Humidity : ${humidity}%`;
                document.getElementById("cityName").textContent = city;

                // Animation Logic
                if (temp <= 15) {
                    showSnowEffect();
                } else if (temp >= 30) {
                    showSunEffect();
                }
            });
    }

    function error() {
        alert("Unable to retrieve your location.");
    }

    function showSnowEffect() {
        const snowScript = document.createElement("script");
        snowScript.src = "https://cdn.jsdelivr.net/npm/canvas-snow@1.0.1/snow.min.js";
        document.body.appendChild(snowScript);
    }

    function showSunEffect() {
        const sun = document.createElement("div");
        sun.innerHTML = `
            <div style="position: fixed; top: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle, yellow 40%, transparent 70%); border-radius: 50%; z-index: 999;"></div>
        `;
        document.body.appendChild(sun);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', async () => {
        const city = document.getElementById('searchInput').value;
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        try {
            // Step 1: Get latitude and longitude from city name
            cityName.innerHTML = city;
            const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
            const geoData = await geoResponse.json();

            if (geoData.length === 0) {
                alert('City not found. Please enter a valid city name.');
                return;
            }

            const { lat, lon } = geoData[0];

            // Step 2: Get weather information using latitude and longitude
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const weatherData = await weatherResponse.json();

            // Display weather information in the provided HTML elements
            document.querySelector('.Temp').innerText = `Temperature is : ${weatherData.main.temp}°C`;
            document.getElementById('wind_speed').innerText = `Wind Speed : ${weatherData.wind.speed} km/h`;
            document.getElementById('Humidity').innerText = `Humidity : ${weatherData.main.humidity}%`;

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather information. Please try again.');
        }
    });
});
