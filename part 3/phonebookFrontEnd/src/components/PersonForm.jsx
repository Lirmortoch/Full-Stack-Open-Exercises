function PersonForm({ handleNameChange, handlePhoneChange, handleSavePerson, name, phone }) {
    return (
        <section className='phonebook__form-section form-section'>
            <h2 className='form-section__title title second-title'>Add a new</h2>

            <form className='phonebook__form phb-form' onSubmit={handleSavePerson}>
            <fieldset className='phb-form__fieldset'>
                <label htmlFor='phb-input-name' className='phb-form__label'>Name</label>
                <input type='text' className='phb-form__input' id='phb-input-name' name='phb-input-name' onChange={handleNameChange} placeholder='Enter Name' value={name} />
            </fieldset>
            <fieldset className='phb-form__fieldset'>
                <label htmlFor='phb-input-phone' className='phb-form__label'>Number</label>
                <input type='tel' className='phb-form__input' id='phb-input-phone' name='phb-input-phone' onChange={handlePhoneChange} placeholder='Enter Phone Number' value={phone} />
            </fieldset>
            <button type="submit" className='phb-form__button' onClick={handleSavePerson} >Add</button>
            </form>
        </section>
    )
}

export default PersonForm;