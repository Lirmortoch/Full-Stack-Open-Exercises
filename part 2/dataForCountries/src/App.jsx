import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import DisplayCountries from './components/DisplayCountries';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  function hook() {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(countries.concat(response.data));
      })
      .catch(error => {
        console.log(`Can't fetch data, something gone wrong: ${error}`)
      });
  }

  useEffect(hook, []);

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

      <DisplayCountries countries={countriesToShow} handleShowCountry={handleShowCountry} />
    </main>
  )
}

export default App
