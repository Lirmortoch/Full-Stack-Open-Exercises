import { useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    
  ]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  const handleSavePerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      phone: newPhone,
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

      <section className='phonebook__form-section form-section'>
        <h2 className='form-section__title title second-title'>Add new number</h2>

        <form className='phonebook__form phb-form'>
          <fieldset className='phb-form__fieldset'>
            <label htmlFor='phb-input-name' className='phb-form__label'>Name</label>
            <input type='text' className='phb-form__input' id='phb-input-name' name='phb-input-name' onChange={handleNameChange} placeholder='Enter Name' />
          </fieldset>
          <fieldset className='phb-form__fieldset'>
            <label htmlFor='phb-input-phone' className='phb-form__label'>Number</label>
            <input type='tel' className='phb-form__input' id='phb-input-phone' name='phb-input-phone' onChange={handlePhoneChange} placeholder='Enter Phone Number' />
          </fieldset>
          <button type="submit" className='phb-form__button' onClick={handleSavePerson} >Add</button>
        </form>
      </section>

      <section className='phonebook__numbers phb-numbers'>
        <h2 className='phb-numbers__title title second-title'>Numbers</h2>

        <ul className='phb-numbers__list phb-list'>
          {persons.map(item => <li key={persons.length + 1} className={classNameProp}>{item.name} - {item.phone}</li>)}
        </ul>
      </section>
      
    </main>
  )
}

export default App
