import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { faBolt, faCloud, faCloudRain, faCloudSunRain, faSmog, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import clear from '../assets/img/clear.jpg';
import cloud from '../assets/img/clouds.jpg';
import drizzle from '../assets/img/drizzle.jpg';
import mist from '../assets/img/mist.jpg';
import rain from '../assets/img/rainy.jpg';
import snow from '../assets/img/snow.jpg';
import thunderstorm from '../assets/img/thunderstrom.jpg';

const WeatherDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { weatherData, city } = location.state || {};

  if (!weatherData) {
    return <h1 className="text-center text-red-600 p-4">No data available. Please go back and try again.</h1>;
  }

  const weatherCondition = weatherData.weather[0].main;
  const getBackgroundImage = (condition) => {
    switch (condition) {
      case 'Clouds': return cloud;
      case 'Clear': return clear;
      case 'Drizzle': return drizzle;
      case 'Mist': return mist;
      case 'Rain': return rain;
      case 'Snow': return snow;
      case 'Thunderstorm': return thunderstorm;
      default: return clear;
    }
  };

  const backgroundImage = getBackgroundImage(weatherCondition);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clouds': return faCloud;
      case 'Clear': return faSun;
      case 'Drizzle': return faCloudSunRain;
      case 'Mist': return faSmog;
      case 'Rain': return faCloudRain;
      case 'Snow': return faSnowflake;
      case 'Thunderstorm': return faBolt;
      default: return faSun;
    }
  };

  const weatherIcon = getWeatherIcon(weatherCondition);

  const currentDate = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  const day = dayNames[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-white px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-xl p-6 sm:p-8 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
        <div className="flex flex-col items-center text-black text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Weather in {city}, {weatherData.sys.country}</h1>
          <p className="text-lg sm:text-xl font-medium">{date} ({day}), {month}, {year}</p>
          <p className="text-4xl sm:text-5xl font-bold">{Math.floor(weatherData.main.temp - 273.15)}°C</p>
          <p className="text-xl font-semibold flex items-center justify-center gap-2">
            {weatherData.weather[0].main}
            <FontAwesomeIcon icon={weatherIcon} />
          </p>
          <p className="text-base">Description: {weatherData.weather[0].description} | Cloudiness: {weatherData.clouds.all}%</p>
          <p className="text-base">Wind: {weatherData.wind.speed} m/s, Direction: {weatherData.wind.deg}°</p>
          <p className="text-base">Feels Like: {Math.ceil(weatherData.main.feels_like - 273.15)}°C | Humidity: {weatherData.main.humidity}%</p>
          <p className="text-base">Max: {Math.ceil(weatherData.main.temp_max - 273.15)}°C | Min: {Math.floor(weatherData.main.temp_min - 273.15)}°C</p>
        </div>
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 active:bg-blue-800 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
