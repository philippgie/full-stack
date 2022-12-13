const Filter = ({state, handler}) => {
    return (
        <>
            <p>filter countries: <input value={state} onChange={handler}/></p>
        </>
    )
}
const Display = ({countries, setSearch}) => {
    console.log(countries.length)
    if(countries.length===1)
        return <OneCountry country={countries[0]}/>
    else if(countries.length===0)
        return (<p>No matches</p>)
    else if(countries.length<=10)
        return <Countries countries={countries} setSearch={setSearch}/>
    else if(countries.length>10)
        return (<p>Too many matches, specify another filter</p>)
}

const Countries = ({countries, setSearch}) => {
    return (
        <ul>
            {countries.map(country=><Country key={country.name.common} name={country.name.common} setSearch={setSearch}/>)}
        </ul>
    )
}

const Country = ({name, setSearch}) => {

    return (
        <p key={name}>{name}
            <Button text="show" handleClick={() => {setSearch(name)}}/>
        </p>
    )
}

const Flag = ({png}) => {
    return <img src={png} alt="Italian Trulli"/>
}

const OneCountry = ({country}) => {
    console.log(country.flags.png)
    return  (
        <>
            <h1>{country.name.common}</h1>
            <p>captial {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {country.languages.length===1 ? <li>{country.language}</li> : Object.entries(country.languages).map(language=><li key={language[1]}>{language[1]}</li>)}
            </ul>
            <Flag png={country.flags.png}/>

        </>
    )
}
const Button = (props) => (
        <button onClick={props.handleClick}>
        {props.text}
        </button>
        )


//export default {Persons, PersonForm, Filter}
export {Display, Filter}
