import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const points = [0,0,0,0,0,0]

const NextButton = ({handleClick}) => {
    return (        
        <button onClick={handleClick}>next anecdote</button>
    )
}

const VoteButton = ({handleVote}) => {
    return (
        <button onClick={handleVote}>vote</button>
    )
}

const Display = ({anecdote, votes, max, winner}) => {
  return (
      <div>
            <div>
                <h1>Anecdote of the day</h1>
                <p>{anecdote}</p>
                <p>has {votes} votes</p>
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                <p>{winner}</p>
                <p>has {max} votes</p>
            </div>
        </div>
        )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [max, setMax] = useState(0)
    const [winner, setWinner] = useState(0)
    const [total, setTotal] = useState(0)
    const size = props.anecdotes.length

    const handleClick = () => {
        setSelected(Math.floor(Math.random() * size))
    }

    const handleVote = () => {
        setTotal(total +1)
        const copy = [...points]
        copy[selected] += 1
        
        for(let i = 0; i < copy.length; i++){
            points[i] = copy[i]
        }

        for(let i = 0; i < copy.length; i++){        
            if (copy[i] > max){
                setMax(copy[i])
                setWinner(i)
            }
        } 
    }

    return (
        <div>
            <Display 
                anecdote={props.anecdotes[selected]} 
                votes={points[selected]} 
                max={max}
                winner={props.anecdotes[winner]}    
            />
            <NextButton handleClick={handleClick}/>
            <VoteButton handleVote={handleVote}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root')
)