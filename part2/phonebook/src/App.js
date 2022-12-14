import { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons} from './components/File'
import axios from 'axios'
import personService from './services/persons'
import './index.css'


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [remarkMessage, setRemarkMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response)
            })
    }, [])

    const ErrorNotification = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    const Notification = ({ message }) => {
        if (message === null) {
            return null
        }

        return (
            <div className='remark'>
                {message}
            </div>
        )
    }

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
        const person = persons.find(n => n.name === newName)
        if(person) {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new onw?`)) {
                const updatedPerson = {...person, number:newNumber}
                personService.update(person.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setRemarkMessage(
                            `Contact '${returnedPerson.name}' was changed`
                        )
                        setTimeout(() => {
                            setRemarkMessage(null)
                        }, 5000)
                        return
                    })
                    .catch(() =>{
                        setPersons(persons.filter(n => n.id !== person.idid))
                        setErrorMessage(
                            `Contact '${person.name}' was already deleted from the server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    }

                    )
            }
            else {
                alert(`${newName} is already added to phonebook`) 
                return
            }        
        }
        else{
            const personObject = {name:newName, number:newNumber}
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setRemarkMessage(
                        `Contact '${returnedPerson.name}' was added to server`
                    )
                    setTimeout(() => {
                        setRemarkMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)

                })
        }        
    }


    const deletePerson = id => {
        const person = persons.find(n => n.id === id)
        if(window.confirm(`Delete $(person.name)`)){
            personService
                .del(id)
                .then(returnedData => {
                    setPersons(persons.filter(n => n.id !== id))
                })
                .catch(error => {
                    alert(
                        `the note '${person.name}' was already deleted from server`
                    )
                })
        }        
    }

    const contactsToShow = !newSearch
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={remarkMessage} />
            <ErrorNotification message={errorMessage} />
            <Filter state={newSearch} handler={handleSearchChange}/>
            <h2>add a new</h2>
            <PersonForm submitHandler={addPerson} nameState={newName} numberState={newNumber} personHandler={handlePersonChange} numberHandler={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons contactsToShow={contactsToShow} deletePerson={deletePerson}/>
        </div>
    )
}



export default App
