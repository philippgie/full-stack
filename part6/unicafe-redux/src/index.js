import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = ({good, neutral, bad}) => {
    if (!good && !neutral && !bad) {
        return (
            <>
                <h1> statistics</h1>
                <p>No feedback given</p>
            </>
        )}
    return (
        <>
            <h1> statistics</h1>
            <table>
                <tbody>
                    <StatisticLine name="good" value={good}/>
                    <StatisticLine name="neutral" value={neutral}/>
                    <StatisticLine name="bad" value={bad}/>
                    <StatisticLine name="all" value={store.getState().good + store.getState().ok + store.getState().bad} />
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
    )}



const App = () => {
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }
    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }
    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }
    const reset = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

    return (
        <div>
            <button onClick={good}>good</button>
            <button onClick={ok}>ok</button>
            <button onClick={bad}>bad</button>
            <button onClick={reset}>reset stats</button>
            <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
