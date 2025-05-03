import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './assets/img/bg1.jpg';

const App = () => {
  const [BG, setBG] = useState(bgImage);
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
  };

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`);
      const data = await response.json();

      console.log(data.weather[0].main);
      if (response.ok) {
        navigate('/weather', { state: { weatherData: data, city } });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div
        className="flex flex-col w-full items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl p-6 sm:p-8 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">Get Weather</h1>
          <form onSubmit={getWeather} className="flex flex-col gap-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="CITY"
              className="w-full text-black py-2 px-4 rounded bg-zinc-300 focus:outline-none"
              placeholder="Enter City Name"
            />
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-800 transition duration-200"
              type="submit"
            >
              Get Weather
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
