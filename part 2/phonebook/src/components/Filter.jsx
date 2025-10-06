function Filter({ handleFilter }) {
    return (
        <section className='phonebook__form-section form-section'>
            <form className='phonebook__form phb-form' onSubmit={(e) => e.preventDefault()}>
            <fieldset className='phb-form__fieldset'>
                <label htmlFor='phb-input-filter' className='phb-form__label'>Filter shown with</label>
                <input type='text' className='phb-form__input' id='phb-input-filter' name='phb-input-filter' placeholder='Enter Filter' onChange={handleFilter} />
            </fieldset>
            </form>
        </section>
    )
}

export default Filter;