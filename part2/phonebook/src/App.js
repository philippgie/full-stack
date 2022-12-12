import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number:"+49123456789"}
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')



    const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.some(person=>person.name === newName)) {
            alert(`${newName} is already added to phonebook`) 
            return
        }
        setPersons(persons.concat({name: newName, number:newNumber}))
        setNewName('')
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handlePersonChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person=><p key={person.name}>{person.name} {person.number}</p>)}
            </ul>
        </div>
    )
}



export default App
