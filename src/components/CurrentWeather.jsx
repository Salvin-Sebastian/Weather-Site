import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { name, sys, main, weather, wind } = data;
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="current-weather glass">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {sys.country}</h2>
          <p className="weather-desc">{weather[0].description}</p>
        </div>
      </div>
      
      <div className="weather-body">
        <div className="temp-container">
          <img src={weatherIcon} alt={weather[0].description} className="weather-icon" />
          <div className="temperature">
            <h1>{Math.round(main.temp)}&deg;C</h1>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(main.feels_like)}&deg;C</span>
          </div>
          <div className="detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
