import React, { useState, useEffect } from "react";
import getWeatherByCity from "./components/WeatherService";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city === "") {
      const timer = setTimeout(() => {
        setWeather(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [city]);

  const handleSearch = async () => {
    try {
      const response = await getWeatherByCity(city);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      alert("Failed to fetch weather data. Please check your city name.");
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>WeatherVue</h1>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {weather && (
        <div className="weather-info">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
        </div>
      )}
    </div>
  );
}

export default App;
