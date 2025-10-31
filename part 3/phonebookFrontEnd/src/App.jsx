import { useState, useEffect } from 'react';
import './App.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

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

  function showMessage(message, type) {
    setMessage(message);
    setMessageType(type);

    setTimeout(() => {
      setMessage(null);
      setMessageType('');
    }, 10000);
  }

  useEffect(useEffectHook, []);

  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [filter, setFilter] = useState('');

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  const handleSavePerson = (event) => {
    event.preventDefault();
    if (newName === '' || newPhone === '') {
      alert('Can\'t add empty field');
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
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

        showMessage(`Added ${returnedPerson.name}`, 'end-success');
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
        console.log('here');
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        showMessage(`Information of ${name} has already been removed from server`, 'error');
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
      
      <Notification type={messageType} msg={message} />

      <Filter handleFilter={handleFilter} />

      <PersonForm handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} handleSavePerson={handleSavePerson} name={newName} phone={newPhone} />

      <Persons personsToShow={personsToShow} handleDeleteUser={handleDeletePerson} />
    </main>
  )
}

export default App
