import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ]) 
    const [newName, setNewName] = useState('')



    const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }


    const addPerson = (event) => {
        event.preventDefault()
        setPersons(persons.concat(newName))
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
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
            {persons.map(person=><p key={person.name}>{persons.name}</p>)}
            </ul>
        </div>
    )
}



export default App
