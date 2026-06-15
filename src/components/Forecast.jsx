import React from 'react';
import './Forecast.css';

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // For this simple app, let's take every 8th item (24 hours apart) from the 3-hour forecast
  // or just the first 5 elements for a simpler layout
  const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (dateString, index) => {
    if (index === 0) return 'Today';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast-container glass">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyData.map((day, index) => (
          <div key={index} className="forecast-item">
            <span className="forecast-day">{getDayName(day.dt_txt, index)}</span>
            <img 
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt={day.weather[0].description} 
              className="forecast-icon"
            />
            <span className="forecast-temp">{Math.round(day.main.temp)}&deg;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
