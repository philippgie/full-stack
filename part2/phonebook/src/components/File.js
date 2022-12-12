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
const Persons = ({contactsToShow}) => {
    return (

        <ul>
            {contactsToShow.map(person=><Person name={person.name} number={person.number}/>)}
        </ul>
    )
}
const Person = ({name, number}) => {
    return  (
        <p key={name}>
            {name} {number}
        </p>
    )
}
//export default {Persons, PersonForm, Filter}
export {Filter, PersonForm, Persons}
