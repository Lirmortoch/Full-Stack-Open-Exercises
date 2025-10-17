import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import DisplayCountries from './components/DisplayCountries';

const weatherId = import.meta.env.VITE_SOME_KEY;

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(undefined);

  function hookGetCountries() {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(countries.concat(response.data));
      })
      .catch(error => {
        console.log(`Can't fetch data, something gone wrong: ${error}`)
      });
  }

  useEffect(hookGetCountries, []);

  function handleOnChangeCountry(e) {
    setCountry(e.target.value);
  }
  function handleShowCountry(country) {
    setCountry(country);
  }

  let countriesToShow;

  if (country !== '') {
    countriesToShow = countries.filter(c => {
      const countryRegEx = new RegExp(`${country}`, 'gmi');
      return countryRegEx.test(c.name.common);
    });
  }

  return (
    <main>
      <Form handleOnChange={handleOnChangeCountry} value={country} />

      <DisplayCountries countries={countriesToShow} handleShowCountry={handleShowCountry} weatherId={weatherId} />
    </main>
  )
}

export default App
