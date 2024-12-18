// Your OpenWeatherMap API key
const API_KEY = '094b1cddc40a67c426c17b4f56de2b4d';

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY          }&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        return {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to display weather
function displayWeather(weather) {
    const weatherResult = document.getElementById('weatherResult');
    if (weather) {
        weatherResult.innerHTML = `
            <h2>${weather.city}</h2>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Weather: ${weather.description}</p>
            <p>Humidity: ${weather.humidity}%</p>
        `;
    } else {
        weatherResult.innerHTML = `<p>Could not fetch weather data. Please try again.</p>`;
    }
}

// Event listener for button
document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (city) {
        const weather = await getWeather(city);
        displayWeather(weather);
    } else {
        alert('Please enter a city name');
    }
});
