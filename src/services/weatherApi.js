// Using mock data for initial development until API key is provided
const MOCK_WEATHER = {
  name: "Mock City",
  sys: { country: "MC" },
  main: {
    temp: 24,
    feels_like: 26,
    humidity: 60,
  },
  weather: [
    {
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    }
  ],
  wind: {
    speed: 5.5,
  }
};

const MOCK_FORECAST = {
  list: [
    { dt_txt: "2026-06-16 12:00:00", main: { temp: 25 }, weather: [{ icon: "01d", main: "Clear" }] },
    { dt_txt: "2026-06-17 12:00:00", main: { temp: 22 }, weather: [{ icon: "10d", main: "Rain" }] },
    { dt_txt: "2026-06-18 12:00:00", main: { temp: 19 }, weather: [{ icon: "03d", main: "Clouds" }] },
    { dt_txt: "2026-06-19 12:00:00", main: { temp: 21 }, weather: [{ icon: "02d", main: "Few Clouds" }] },
    { dt_txt: "2026-06-20 12:00:00", main: { temp: 24 }, weather: [{ icon: "01d", main: "Clear" }] },
  ]
};

// To switch to real API, replace these and add your key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const USE_MOCK = false; 

export const fetchWeatherData = async (city) => {
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (city.toLowerCase() === "error") {
          reject(new Error("City not found"));
        } else {
          resolve({
            current: { ...MOCK_WEATHER, name: city.charAt(0).toUpperCase() + city.slice(1) },
            forecast: MOCK_FORECAST
          });
        }
      }, 800); // Simulate network latency
    });
  }

  try {
    const currentRes = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!currentRes.ok) throw new Error("City not found");
    const current = await currentRes.json();

    const forecastRes = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    const forecast = await forecastRes.json();

    return { current, forecast };
  } catch (error) {
    throw error;
  }
};
