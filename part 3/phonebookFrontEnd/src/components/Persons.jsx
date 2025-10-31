function Persons({ personsToShow, handleDeleteUser }) {
    return (
        <section className='phonebook__numbers phb-numbers'>
            <h2 className='phb-numbers__title title second-title'>Numbers</h2>

            <ul className='phb-numbers__list phb-list'>
            {personsToShow.map(item => <li key={item.id} className='phb-list__item'><span>{item.name}</span> <span>{item.number}</span> <button onClick={() => handleDeleteUser(item.id, item.name)}>Delete</button></li>)}
            </ul>
        </section> 
    );
}

export default Persons;