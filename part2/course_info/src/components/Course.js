const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total sum={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}/>
        </>
    )

}

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part name={part.name} exercises={part.exercises}/>)}
        </>
    )
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Total = ({ sum }) => <b>Number of exercises {sum}</b>
    
export default Course
