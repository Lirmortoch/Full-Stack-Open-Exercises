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
      id: String(persons.length + 1),
    }

    if (persons.some(item => item.name === newPerson.name)) {
      const isAddNewNumber = confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);

      if (isAddNewNumber) updatePerson(newPerson.name);

      return;
    }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        console.log(`Can't add new person. Get some trouble: ${error}`);
      });
  }
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  const handleDeletePerson = (id, name) => {
    const isDelete = confirm(`Delete ${name}?`);

    if (!isDelete) return;
    
    personsService
      .deleteItem(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id));
      })
      .catch(error => {
        console.log(`Can't delete user ${name}. Get some trouble: ${error}`);
      });
  }

  const updatePerson = (name) => {
    const person = persons.find(p => p.name === name);
    const id = person.id;
    const updatedPerson = {...person, number: newPhone};

    personsService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === id ? returnedPerson : p));
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        console.log(`Can't update person's number. Get some trouble: ${error}`);
      });
  }
  const personsToShow = persons.filter(item => {
    const regEx = new RegExp(filter, 'gim');
    return regEx.test(item.name);
  });

  return (
    <main className='phonebook'>
      <h1 className='phonebook__title title'>Phonebook</h1>

      <Filter handleFilter={handleFilter} />

      <PersonForm handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSavePerson={handleSavePerson} name={newName} phone={newPhone} />

      <Persons personsToShow={personsToShow} handleDeleteUser={handleDeletePerson} />
    </main>
  )
}

export default App
