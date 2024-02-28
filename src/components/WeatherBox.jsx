import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITEREACT_APP_API_KEY

const WeatherBox = () => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchCurrentWeather = async (city) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        if(!response.ok) {
          throw new Error('Error fetching weather')
        }

        const data = await response.json();
        return data
      } catch (error) {
        console.log("Error fetch weather data:", error)
      }
    }
    fetchCurrentWeather('London')
  }, [])



  return <div><h1>I am the weather box!</h1></div>
}

export default WeatherBox