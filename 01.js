const API_KEY = "1d888793ed150af62a11ccd5ba4f3a92";

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
