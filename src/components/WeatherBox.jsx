import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
console.log("API key after import: ", API_KEY)
const lat = 48.436762
const long = -89.224115

const WeatherBox = () => {
  const [weather, setWeather] = useState(null)
  const [windDirection, setWindDirection] = useState('');

  useEffect(() => {
    console.log("API key use effect: ", API_KEY)
    const fetchCurrentWeather = async (API_KEY) => {
      try {
        // const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover_low,visibility,wind_speed_10m,wind_direction_10m');
    
        // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover_low,visibility,wind_speed_10m,wind_direction_10m`)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=48.399&lon=-89.267&appid=2019b4b890f5fbb2035fd12369eb0b10&units=metric`)
        // const response = await fetch('https://api.meteomatics.com/2024-02-29T00:00:00Z/t_2m:C/52.520551,13.461804/json')
        // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${API_KEY}`)
        // console.log("Post call API:", API_KEY)
        if(!response.ok) {
          throw new Error('Error fetching weather')
        }

        const data = await response.json();
        console.log(data)
        setWeather(data)

        //sets/converts wind direction based on diviing up 360 by 8
        if (data && data.hourly && data.hourly.wind_direction_10m) {
          const windDirection = determineWindDirection(data.hourly.wind_direction_10m[0]);
          setWindDirection(windDirection);
        }

        return data
      } catch (error) {
        console.log("Error fetch weather data:", error)
      }
    }
    fetchCurrentWeather(API_KEY)
  }, [])

  const determineWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };


  return (
    <div>
      <h2>Current Conditions for {weather ? weather.name : "loading..."}</h2>
      {weather ? (
        <>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Wind: {weather.wind.speed}km/h {weather.main.windDirection}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {/* Other weather details */}
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
);

}

export default WeatherBox