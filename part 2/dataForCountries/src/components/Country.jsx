import { useState, useEffect } from "react";
import axios from "axios";

export default function Country({ country, weatherId }) {
  const [weather, setWeather] = useState(null);
  function hookGetWeather() {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weatherId}&units=metric`)
    .then(response => {
        setWeather(response.data);
    })
    .catch(error => {
      console.log(`Can't fetch weather, something gone wrong: ${error}`)
    });
  }

  useEffect(hookGetWeather, []);
  console.log(weather);
  return (  
    <>
        <h1>{country.name.common}</h1>

        <div className="capital">
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
        </div>

        <div>
          <h2>Languages</h2>
          <ul>
            {
              Object.entries(country.languages).map(item => <li key={item[0]}>{item[1]}</li>)
            }
          </ul>
        </div>

        <div className="flag">
          <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>

        {(weather && <div>
          <h2>Weather in {country.name.common}</h2>

          <p>Temperature {weather.main.temp} Celsius</p>
          <div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
          </div>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>)}
    </>
  )
}