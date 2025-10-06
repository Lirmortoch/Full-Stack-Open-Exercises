function Persons({ personsToShow }) {
    return (
        <section className='phonebook__numbers phb-numbers'>
            <h2 className='phb-numbers__title title second-title'>Numbers</h2>

            <ul className='phb-numbers__list phb-list'>
            {personsToShow.map(item => <li key={item.id} className='phb-list__item'>{item.name} {item.number}</li>)}
            </ul>
        </section> 
    );
}

export default Persons;