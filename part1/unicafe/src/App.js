import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
    if (!good && !neutral && !bad) {
        return (
                <>
                <h1> statistics</h1>
                <p>No feedback given</p>
                </>
               )
    }
    return (
            <>
            <h1> statistics</h1>
            <table>
            <tbody>
            <StatisticLine name="good" value={good}/>
            <StatisticLine name="neutral" value={neutral}/>
            <StatisticLine name="bad" value={bad}/>
            <Average good={good} neutral={neutral} bad={bad}/>
            <Percentage good={good} neutral={neutral} bad={bad}/>
            </tbody>
            </table>
            </>
           )
}

const Average = ({good, neutral, bad}) => {
    return <StatisticLine name="average" value={(good-bad)/(good+neutral+bad)}/>
}

const Percentage = ({good, neutral, bad}) => {
    return <StatisticLine name="positive" value={(good)/(good+neutral+bad)}/>
}

const StatisticLine = ({name, value}) => {
    //return <p>{name} {value}</p>
    return (
            <tr>
            <td>{name}</td>
            <td>{value}</td>
            </tr>
           )
}

const Button = (props) => (
        <button onClick={props.handleClick}>
        {props.text}
        </button>
        )

const Feedback = ({good, neutral, bad, setGood, setNeutral, setBad}) => {
    return (
            <>
            <h1>give feedback</h1>
            <Button text="good" handleClick={() => setGood(good+1)}/>
            <Button text="neutral" handleClick={() => setNeutral(neutral+1)}/>
            <Button text="bad" handleClick={() => setBad(bad+1)}/>
            </>
           )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
        const [neutral, setNeutral] = useState(0)
        const [bad, setBad] = useState(0)

        return (
                <div>
                <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
                <Statistics good={good} neutral={neutral} bad={bad}/>
                </div>
               )
}

export default App
