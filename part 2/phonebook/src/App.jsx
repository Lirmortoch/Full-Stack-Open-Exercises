import { useState } from 'react'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <main className='phonebook'>
      <h1 className='phonebook__title title'>Phonebook</h1>

      <form className='phonebook__form phb-form'>
        <fieldset className='phb-form__fieldset'>
          <label htmlFor='phb-input' className='phb-form__label'>name</label>
          <input type='text' className='phb-form__input' id='phb-input' text='phb-input' />
        </fieldset>
        <fieldset className='phb-form__fieldset phb-form-submit'>
          <button type="submit" className='phb-form__button'>add</button>
        </fieldset>
      </form>

      <section className='phonebook__numbers phb-numbers'>
        <h2 className='phb-numbers__title title'>Numbers</h2>


      </section>
      
    </main>
  )
}

export default App
