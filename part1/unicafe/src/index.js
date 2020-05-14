import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.count}</td>
    </tr>
  )
}

const Average = ({good, neutral, bad}) => {
  const avg = (good + neutral + bad)?(good - bad)/(good + neutral + bad):0
  return (
    <tr>
      <td>average</td>
      <td>{avg}</td>
    </tr>
  )
}

const Postive = ({good, neutral, bad}) => {
  const pos = (good + neutral + bad)?good/(good + neutral + bad):0
  return (
    <tr>
      <td>pos</td>
      <td>{pos * 100}%</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad > 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic name="good" count={good} />
            <Statistic name="neutral" count={neutral} />
            <Statistic name="bad" count={bad} />
            <Average good={good} neutral={neutral} bad={bad} />
            <Postive good={good} neutral={neutral} bad={bad} />
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={addGood} text="good" />
        <Button onClick={addNeutral} text="neutral" />
        <Button onClick={addBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)