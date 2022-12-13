import { useState, useEffect } from 'react'
import {Filter, Display} from './components/File'
import axios from 'axios'

const App = () => {
    const [countries,  setNewCountries] = useState([]) 
    const [newSearch, setNewSearch] = useState('')


    useEffect(() => {
        if(newSearch){
            console.log('effect')
            axios
                .get(`https://restcountries.com/v3.1/name/${newSearch}`)
                .then(response => {
                    console.log('promise fulfilled')
                    setNewCountries(response.data)
                })
                .catch(function (error){
                    if(error.response.status!==404)
                        console.log(error)
                    else
                        setNewCountries([])
                })
        }
    },[newSearch])

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value)
    }

    return (
        <div>
            <Filter state={newSearch} handler={handleSearchChange}/>
            <Display countries={countries} setSearch={setNewSearch}/>
        </div>
    )
}



export default App
