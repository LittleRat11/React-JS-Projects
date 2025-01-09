import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchWeather = async (city) => {
  const apiKey = "YOUR_API_KEY";
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const App = () => {
  const [searchCity, setSearchCity] = useState('Yangon');
  const cityRef = useRef();
  const { data, error, isLoading } = useQuery(['weather', searchCity], () => fetchWeather(searchCity));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchCity(cityRef.current.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <form onSubmit={handleSearch} className="p-4">
          <input
            type="text"
            ref={cityRef}
            className="border p-2 w-full my-4"
            placeholder="Enter city name"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
          >
            Get Weather Information
          </button>
        </form>
        {isLoading ? <p>Loading....</p> : null}
        {error && <p className="text-red-500 text-center">{error.message}</p>}
        {data && (
          <div className="text-center p-3 m-3">
            <h2 className="text-xl font-semibold mb-2">{data.name}</h2>
            <p className="text-gray-700">Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p className="text-gray-700">Weather: {data.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default App;