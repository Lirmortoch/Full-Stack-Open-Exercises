import { useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleSavePerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
    }

    if (persons.some(item => item.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const classNameProp = 'phb-list__item'

  return (
    <main className='phonebook'>
      <h1 className='phonebook__title title'>Phonebook</h1>

      <form className='phonebook__form phb-form'>
        <fieldset className='phb-form__fieldset'>
          <label htmlFor='phb-input' className='phb-form__label'>name</label>
          <input type='text' className='phb-form__input' id='phb-input' text='phb-input' onChange={handleNameChange} />
        </fieldset>
        <fieldset className='phb-form__fieldset phb-form-submit'>
          <button type="submit" className='phb-form__button' onClick={handleSavePerson} >add</button>
        </fieldset>
      </form>

      <section className='phonebook__numbers phb-numbers'>
        <h2 className='phb-numbers__title title'>Numbers</h2>

        <ul className='phb-numbers__list phb-list'>
          {persons.map(item => <li key={persons.length + 1} className={classNameProp}>{item.name}</li>)}
        </ul>
      </section>
      
    </main>
  )
}

export default App
