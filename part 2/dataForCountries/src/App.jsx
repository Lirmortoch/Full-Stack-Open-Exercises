import { useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import Country from './components/Country';

const weatherId = import.meta.env.VITE_SOME_KEY;

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  function hookGetCountries() {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(countries.concat(response.data));
      })
      .catch(error => {
        console.log(`Can't fetch countries, something gone wrong: ${error}`)
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

  let elem;

  if (countriesToShow === undefined || countriesToShow.length === 0) {
    elem = <p>No countries to show</p>
  }
  else if (countriesToShow.length > 10) {
    elem = <p>Too many matches, specify another filter</p>
  }
  else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
    elem = (
      <ul>
        {countriesToShow.map(item => {
          return (
              <li key={item.area}>
                <span>{item.name.common}</span>
                <button onClick={() => handleShowCountry(item.name.common)}>Show</button>
              </li>
            );
        })}
      </ul>
    );
  }
  else if (countriesToShow.length === 1) {
    elem = <Country country={countriesToShow[0]} weatherId={weatherId} />;
  }

  return (
    <main>
      <Form handleOnChange={handleOnChangeCountry} value={country} />

      <section className='country'>{elem}</section>
    </main>
  )
}

export default App
