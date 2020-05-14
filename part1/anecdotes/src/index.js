import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.votes)
  console.log("init points", votes)

  const setSelectedToRandom = () => {
    let randomInt = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(randomInt)
  }

  const voteSelected = () => {
    let updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]}</p>
      <button onClick={voteSelected}>vote</button>
      <button onClick={setSelectedToRandom}>next anecdote</button>
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

const votes = new Array(6).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes}/>,
  document.getElementById('root')
)