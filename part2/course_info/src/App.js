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

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course} />
}

export default App