const Filter = ({state, handler}) => {
    return (
        <div>
            filter shown with: <input value={state} onChange={handler}/>
        </div>
    )
}
const PersonForm = ({submitHandler, nameState, numberState, personHandler, numberHandler}) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={nameState} onChange={personHandler}/>
            </div>
            <div>
                number: <input value={numberState} onChange={numberHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>

    )
}
const Persons = ({contactsToShow, deletePerson}) => {
    return (

        <ul>
            {contactsToShow.map(person=><Person key={person.name} person={person} deletePerson={deletePerson}/>)}
        </ul>
    )
}
const Person = ({person, deletePerson}) => {
    return  (
        <p>
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person.id)}>
               delete 
            </button>
        </p>
    )
}
//export default {Persons, PersonForm, Filter}
export {Filter, PersonForm, Persons}
