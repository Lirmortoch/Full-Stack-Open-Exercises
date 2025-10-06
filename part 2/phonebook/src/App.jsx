import { use, useState } from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

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
      number: newPhone,
      id: persons.length + 1,
    }

    if (persons.some(item => item.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
  }
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const classNameProp = 'phb-list__item';
  const personsToShow = persons.filter(item => {
    const regEx = new RegExp(filter, 'gim');
    return regEx.test(item.name);
  });

  return (
    <main className='phonebook'>
      <h1 className='phonebook__title title'>Phonebook</h1>

      <section className='phonebook__form-section form-section'>
        <form className='phonebook__form phb-form'>
          <fieldset className='phb-form__fieldset'>
            <label htmlFor='phb-input-name' className='phb-form__label'>Filter shown with</label>
            <input type='text' className='phb-form__input' id='phb-input-name' name='phb-input-name' placeholder='Enter Filter' onChange={handleFilter} />
          </fieldset>
        </form>
      </section>

      <section className='phonebook__form-section form-section'>
        <h2 className='form-section__title title second-title'>Add a new</h2>

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
          {personsToShow.map(item => <li key={item.id} className={classNameProp}>{item.name} {item.number}</li>)}
        </ul>
      </section>  
    </main>
  )
}

export default App
