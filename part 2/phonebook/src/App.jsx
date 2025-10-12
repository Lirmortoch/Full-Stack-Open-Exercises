import { useState, useEffect } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';

function App() {
  function useEffectHook() {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        console.log(`Can't load persons. Get something trouble: ${error}`);
      });
  }

  useEffect(useEffectHook, []);

  const [persons, setPersons] = useState([]); 
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

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      })
      .catch(error => {
        console.log(`Can't add new person. Get some trouble: ${error}`);
      });
  }
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow = persons.filter(item => {
    const regEx = new RegExp(filter, 'gim');
    return regEx.test(item.name);
  });

  return (
    <main className='phonebook'>
      <h1 className='phonebook__title title'>Phonebook</h1>

      <Filter handleFilter={handleFilter} />

      <PersonForm handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSavePerson={handleSavePerson} />

      <Persons personsToShow={personsToShow} />
    </main>
  )
}

export default App
