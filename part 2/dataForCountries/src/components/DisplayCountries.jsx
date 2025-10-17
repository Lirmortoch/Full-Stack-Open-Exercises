export default function DisplayCountries({ countries, handleShowCountry }) {
  let elem;

  if (countries === undefined) {
    elem = <p>No countries to show</p>
  }
  else if (countries.length > 10) {
    elem = <p>Too many matches, specify another filter</p>
  }
  else if (countries.length <= 10 && countries.length > 1) {
    elem = (
      <ul>
        {countries.map(item => {
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
  else if (countries.length === 1) {
    const country = countries[0];

    elem = (
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
      </>
    );
  }

  return (
    <section className="countr">
        {elem}
    </section>
  )
}