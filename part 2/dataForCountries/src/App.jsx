import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import DisplayCountry from './components/displayCountry';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  function hook() {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(countries.concat(response.data));
      });
  }

  useEffect(hook, []);

  function handleOnChangeCountry(e) {
    setCountry(e.target.value);
  }

  const countriesToShow = countries.filter(c => {
    const countryRegEx = new RegExp(`${country}`, 'gmi');
    return countryRegEx.test(c.name.common);
  });

  return (
    <main>
      <Form handleOnChange={handleOnChangeCountry} />

      <DisplayCountry countries={countriesToShow} />
    </main>
  )
}

export default App
