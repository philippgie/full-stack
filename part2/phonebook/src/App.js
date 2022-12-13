import { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './components/File'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number:"+49123456789"}
    ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')


    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    const handlePersonChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.some(person=>person.name === newName)) {
            alert(`${newName} is already added to phonebook`) 
            return
        }
        const personObject = {name:newName, number:newNumber}
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
        //setPersons(persons.map(person => person.id !== id ? person : response.data))
            .catch(error => {
                console.log('fail', error)
            })
    }

    const contactsToShow = !newSearch
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter state={newSearch} handler={handleSearchChange}/>
            <h2>add a new</h2>
            <PersonForm submitHandler={addPerson} nameState={newName} numberState={newNumber} personHandler={handlePersonChange} numberHandler={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons contactsToShow={contactsToShow}/>
        </div>
    )
}



export default App
