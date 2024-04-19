import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//need to import font awesome react package
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);


import WeatherBox from './components/WeatherBox'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-cloud-bolt-sun" />
      <h1>Weather Now</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      <div>
        <WeatherBox/>
      </div>

    </>
  )
}

export default App