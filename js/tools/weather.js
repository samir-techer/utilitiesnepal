// ============================================
// WEATHER NEPAL
// ============================================

const WeatherTool = {
  currentCity: Utils.storage.get('weatherCity', 'Kathmandu'),

  async fetchWeather(city) {
    const cityData = APP_DATA.nepalCities.find(c => c.name === city);
    if (!cityData) return null;

    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Kathmandu&forecast_days=7`);
      const data = await res.json();
      return data;
    } catch {
      return null;
    }
  },

  getWeatherDesc(code) {
    const codes = {
      0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
      45: "Foggy", 48: "Depositing rime fog",
      51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
      61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
      71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
      80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
      95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail"
    };
    return codes[code] || "Unknown";
  },

  getWeatherIcon(code) {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 55) return "🌦️";
    if (code <= 65) return "🌧️";
    if (code <= 75) return "🌨️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  },

  render() {
    return `
      <div class="tool-page">
        <div class="page-header">
          <h1 class="page-title">Weather Nepal</h1>
          <p class="page-desc">Current weather and 7-day forecast for cities across Nepal.</p>
        </div>
        <div class="tool-container">
          <div class="form-group">
            <label class="form-label">Select City</label>
            <select class="form-select" id="weatherCity" onchange="WeatherTool.changeCity(this.value)">
              ${APP_DATA.nepalCities.map(c => `<option value="${c.name}" ${c.name === this.currentCity ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div id="weatherContent">
            <div class="result-box" style="padding:40px;">
              <div class="result-label">Loading weather data...</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async changeCity(city) {
    this.currentCity = city;
    Utils.storage.set('weatherCity', city);
    await this.loadWeather();
  },

  async loadWeather() {
    const container = document.getElementById('weatherContent');
    if (!container) return;

    container.innerHTML = `<div class="result-box" style="padding:40px;"><div class="result-label">Loading...</div></div>`;

    const data = await this.fetchWeather(this.currentCity);
    if (!data || !data.current) {
      container.innerHTML = `
        <div class="result-box" style="padding:40px;">
          <div class="result-label">Unable to fetch weather data. Please check your connection.</div>
          <button class="btn btn-secondary btn-sm" style="margin-top:12px;" onclick="WeatherTool.loadWeather()">Retry</button>
        </div>
      `;
      return;
    }

    const current = data.current;
    const daily = data.daily;
    const desc = this.getWeatherDesc(current.weather_code);
    const icon = this.getWeatherIcon(current.weather_code);

    container.innerHTML = `
      <div class="weather-current">
        <div class="weather-city">${this.currentCity}</div>
        <div style="font-size:3rem;margin:8px 0;">${icon}</div>
        <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
        <div class="weather-desc">${desc}</div>
        <div class="weather-details">
          <div class="weather-detail">
            <div class="weather-detail-value">${current.relative_humidity_2m}%</div>
            <div class="weather-detail-label">Humidity</div>
          </div>
          <div class="weather-detail">
            <div class="weather-detail-value">${Math.round(current.wind_speed_10m)} km/h</div>
            <div class="weather-detail-label">Wind</div>
          </div>
          <div class="weather-detail">
            <div class="weather-detail-value">${Math.round(current.apparent_temperature)}°C</div>
            <div class="weather-detail-label">Feels Like</div>
          </div>
        </div>
      </div>
      <h3 style="font-size:1rem;font-weight:700;margin-bottom:16px;">7-Day Forecast</h3>
      <div class="forecast-grid">
        ${daily.time.map((t, i) => {
          const date = new Date(t);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          return `
            <div class="forecast-day">
              <div class="forecast-day-name">${dayName}</div>
              <div style="font-size:1.5rem;margin:4px 0;">${this.getWeatherIcon(daily.weather_code[i])}</div>
              <div class="forecast-day-temp">${Math.round(daily.temperature_2m_max[i])}°</div>
              <div class="forecast-day-desc">${this.getWeatherDesc(daily.weather_code[i])}</div>
              <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">L: ${Math.round(daily.temperature_2m_min[i])}°</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  async init() {
    await this.loadWeather();
  }
};

window.WeatherTool = WeatherTool;
