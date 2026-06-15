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
      body.style.background = 'radial-gradient(circle at top right, #ff7e5f 0%, #feb47b 100%)';
    } else if (condition.includes('cloud')) {
      body.style.background = 'radial-gradient(circle at top right, #757f9a 0%, #d7dde8 100%)';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      body.style.background = 'radial-gradient(circle at top right, #373b44 0%, #4286f4 100%)';
    } else if (condition.includes('snow')) {
      body.style.background = 'radial-gradient(circle at top right, #e0eafc 0%, #cfdef3 100%)';
    } else {
      body.style.background = 'radial-gradient(circle at top right, #141e30 0%, #243b55 100%)'; // default night/other
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
