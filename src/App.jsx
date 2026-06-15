import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { fetchWeatherData } from './services/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Set dynamic background based on weather condition
  useEffect(() => {
    if (!weatherData) return;
    
    const condition = weatherData.current.weather[0].main.toLowerCase();
    const body = document.body;
    
    // Smooth transition
    body.style.transition = 'background 1s ease-in-out';
    
    if (condition.includes('clear')) {
      body.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    } else if (condition.includes('cloud')) {
      body.style.background = 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      body.style.background = 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)';
    } else if (condition.includes('snow')) {
      body.style.background = 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)';
    } else {
      body.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'; // default night/other
    }
  }, [weatherData]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && weatherData && (
        <div className="weather-content">
          <CurrentWeather data={weatherData.current} />
          <Forecast data={weatherData.forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
