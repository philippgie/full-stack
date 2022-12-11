import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    return (
            <>
            <Total name="good" count={good}/>
            <Total name="neutral" count={neutral}/>
            <Total name="bad" count={bad}/>
            <Average good={good} neutral={neutral} bad={bad}/>
            <Percentage good={good} neutral={neutral} bad={bad}/>
            </>
           )
}

const Total = ({name, count}) => {
    return (<p>{name} {count}</p>)
}

const Average = ({good, neutral, bad}) => {
    if (!good && !neutral && !bad) {return <p>average 0</p>}
    return (<p>average {(good-bad)/(good+neutral+bad)}</p>)
}

const Percentage = ({good, neutral, bad}) => {
    if (!good && !neutral && !bad) {return <p>average 0</p>}
    return (<p>positive {(good)/(good+neutral+bad)}</p>)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
        const [neutral, setNeutral] = useState(0)
        const [bad, setBad] = useState(0)

        return (
                <div>
                <Statistics good={good} neutral={neutral} bad={bad}/>
                </div>
               )
}

export default App
