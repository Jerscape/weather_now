import '../weather-box.css';
import { useState, useEffect } from 'react'
// const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const apiKey = import.meta.env.VITE_API_KEY;
// console.log("API key after import: ", API_KEY)
console.log("API key after import: ", apiKey)

// let lat, lon;

// function setPosition(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
//   console.log(`Latitude: ${lat}, Longitude: ${lon}`);
// }

// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition(setPosition);
// } else {
//   console.log("Geolocation is not supported by this browser.");
// }
// const lat = 48.436762
// const lon = -89.224115

// const lat = 25.761
// const lon = -80.191

const WeatherBox = () => {
  const [weather, setWeather] = useState(null)
  // const [windDirection, setWindDirection] = useState('');

  //get lat and long before API call

  const [position, setPosition] = useState({ lat: null, lon: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Update position state with latitude and longitude
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      }, (error) => {
        console.error("Error fetching geolocation:", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log("API key use effect: ", apiKey)
    const fetchCurrentWeather = async (apiKey) => {
      try {
        // const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover_low,visibility,wind_speed_10m,wind_direction_10m');
    
        // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover_low,visibility,wind_speed_10m,wind_direction_10m`)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}&units=metric`)
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
    fetchCurrentWeather(apiKey)
  }, [position.lat, position.lon]); // Added dependency array. this was crucial to allow for it to re-run when lat and long were returned by the browswer

  const determineWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };


  return (
    <div className="weather-box">
      <h2>Current Conditions for {weather ? weather.name : "loading..."}</h2>
      {weather ? (
        <>
          <p>{weather.main.description}</p>
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