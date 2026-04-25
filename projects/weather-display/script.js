// Replace with your free API key from https://openweathermap.org/api
var API_KEY = 'YOUR_API_KEY';

var currentTempC = 0;
var currentFeelsC = 0;

// Demo data for popular cities (used when API key is not set)
var demoData = {
  'mumbai':   { name: 'Mumbai', country: 'IN', tempC: 32, feelsC: 36, desc: 'humid and hazy', icon: '🌫️', humidity: '85%', wind: '14 km/h', visibility: '4 km' },
  'london':   { name: 'London', country: 'GB', tempC: 12, feelsC: 9,  desc: 'light rain',     icon: '🌧️', humidity: '78%', wind: '22 km/h', visibility: '8 km' },
  'new york': { name: 'New York', country: 'US', tempC: 18, feelsC: 16, desc: 'partly cloudy', icon: '⛅', humidity: '60%', wind: '18 km/h', visibility: '12 km' },
  'tokyo':    { name: 'Tokyo', country: 'JP', tempC: 22, feelsC: 21, desc: 'clear sky',       icon: '☀️', humidity: '55%', wind: '10 km/h', visibility: '16 km' },
  'paris':    { name: 'Paris', country: 'FR', tempC: 15, feelsC: 13, desc: 'overcast clouds',  icon: '☁️', humidity: '70%', wind: '16 km/h', visibility: '10 km' }
};

function getWeatherIcon(desc) {
  desc = desc.toLowerCase();
  if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('thunder')) return '⛈️';
  if (desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('haze') || desc.includes('fog') || desc.includes('mist')) return '🌫️';
  return '🌤️';
}

function showWeatherCard(data) {
  currentTempC = data.tempC;
  currentFeelsC = data.feelsC;

  document.getElementById('cityName').textContent = data.name;
  document.getElementById('countryName').textContent = data.country;
  document.getElementById('weatherIcon').textContent = data.icon || getWeatherIcon(data.desc);
  document.getElementById('tempC').textContent = data.tempC + '°C';
  document.getElementById('description').textContent = data.desc;
  document.getElementById('humidity').textContent = data.humidity;
  document.getElementById('wind').textContent = data.wind;
  document.getElementById('feelsLike').textContent = data.feelsC + '°C';
  document.getElementById('visibility').textContent = data.visibility;
  document.getElementById('lastUpdated').textContent = 'Updated: ' + new Date().toLocaleTimeString();

  document.getElementById('errorMsg').style.display = 'none';
  document.getElementById('weatherCard').style.display = 'block';

  // Reset to Celsius
  document.getElementById('btnC').classList.add('active');
  document.getElementById('btnF').classList.remove('active');
}

function fetchWeather(city) {
  if (API_KEY === 'YOUR_API_KEY') {
    // Use demo data
    var key = city.toLowerCase();
    if (demoData[key]) {
      showWeatherCard(demoData[key]);
    } else {
      document.getElementById('errorMsg').style.display = 'block';
      document.getElementById('weatherCard').style.display = 'none';
    }
    return;
  }

  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + '&appid=' + API_KEY + '&units=metric';

  fetch(url)
    .then(function(res) {
      if (!res.ok) throw new Error('Not found');
      return res.json();
    })
    .then(function(json) {
      var visibility = json.visibility ? (json.visibility / 1000).toFixed(1) + ' km' : 'N/A';
      showWeatherCard({
        name: json.name,
        country: json.sys.country,
        tempC: Math.round(json.main.temp),
        feelsC: Math.round(json.main.feels_like),
        desc: json.weather[0].description,
        icon: getWeatherIcon(json.weather[0].description),
        humidity: json.main.humidity + '%',
        wind: json.wind.speed + ' m/s',
        visibility: visibility
      });
    })
    .catch(function() {
      document.getElementById('errorMsg').style.display = 'block';
      document.getElementById('weatherCard').style.display = 'none';
    });
}

function showCelsius() {
  document.getElementById('tempC').textContent = currentTempC + '°C';
  document.getElementById('feelsLike').textContent = currentFeelsC + '°C';
  document.getElementById('btnC').classList.add('active');
  document.getElementById('btnF').classList.remove('active');
}

function showFahrenheit() {
  var tempF = Math.round(currentTempC * 9 / 5 + 32);
  var feelsF = Math.round(currentFeelsC * 9 / 5 + 32);
  document.getElementById('tempC').textContent = tempF + '°F';
  document.getElementById('feelsLike').textContent = feelsF + '°F';
  document.getElementById('btnF').classList.add('active');
  document.getElementById('btnC').classList.remove('active');
}

function quickSearch(city) {
  document.getElementById('cityInput').value = city;
  fetchWeather(city);
}

document.getElementById('searchBtn').addEventListener('click', function() {
  var city = document.getElementById('cityInput').value.trim();
  if (!city) return;
  fetchWeather(city);
});

document.getElementById('cityInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') fetchWeather(this.value.trim());
});

// Load Mumbai on start
quickSearch('Mumbai');
