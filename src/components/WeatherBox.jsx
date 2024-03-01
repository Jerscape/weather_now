import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
console.log("API key after import: ", API_KEY)
const lat = 48.436762
const long = -89.224115

const WeatherBox = () => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log("API key use effect: ", API_KEY)
    const fetchCurrentWeather = async (API_KEY) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover_low,visibility,wind_speed_10m,wind_direction_10m`)
        // const response = await fetch('https://api.meteomatics.com/2024-02-29T00:00:00Z/t_2m:C/52.520551,13.461804/json')
        // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${API_KEY}`)
        // console.log("Post call API:", API_KEY)
        if(!response.ok) {
          throw new Error('Error fetching weather')
        }

        const data = await response.json();
        console.log(data)
        setWeather(data)
        return data
      } catch (error) {
        console.log("Error fetch weather data:", error)
      }
    }
    fetchCurrentWeather(API_KEY)
  }, [])

return (
    <div>
      <h2>I am the weather box! Current Conditions for hardcoded lat and long (Thunder Bay)</h2>
      {weather ? (
        <>
          <p>Temperature: {weather.hourly.temperature_2m[0]}c</p>
          <p>Relative Humidity: {weather.hourly.relative_humidity_2m[0]}%</p>
         
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherBox