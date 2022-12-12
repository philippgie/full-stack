import { useState } from 'react'

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

const Button = (props) => (
        <button onClick={props.handleClick}>
        {props.text}
        </button>
        )

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)

    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
    console.log(votes)

    const max = indexOfMax(votes)

    return (
            <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <br/>
            has {votes[selected]} votes.
            <br/>
            <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))}/>
            <Button text="vote anecdote" handleClick={
                () => {
                    const copy = [...votes]
                    copy[selected] += 1 
                    setVotes(copy)
                }
            }/>
            <h1>Anecdote with most votes</h1>
            {anecdotes[max]}
            <br/>
            has {votes[max]} votes.
            </div>
           )
}

export default App
