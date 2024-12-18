const API_KEY =  '094b1cddc40a67c426c17b4f56de2b4d'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast-container');
const forecastSection = document.getElementById('forecast');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  } else {
    alert('Please enter a city name!');
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayCurrentWeather(data);
    } else {
      alert('City not found!');
    }
  } catch (error) {
    alert('Error fetching weather data!');
  }
}

function displayCurrentWeather(data) {
  currentWeather.classList.remove('hidden');
  document.getElementById('city-name').textContent = `Weather in ${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
}

async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayForecast(data);
    } else {
      alert('Forecast not available!');
    }
  } catch (error) {
    alert('Error fetching forecast data!');
  }
}

function displayForecast(data) {
  forecastSection.classList.remove('hidden');
  forecastContainer.innerHTML = '';

  const dailyForecasts = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = item;
    }
  });

  Object.values(dailyForecasts).forEach((forecast) => {
    const day = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
    const temp = forecast.main.temp;
    const icon = forecast.weather[0].icon;

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <h4>${day}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
      <p>${temp}°C</p>
    `;
    forecastContainer.appendChild(forecastItem);
  });
}
