import { useState } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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
