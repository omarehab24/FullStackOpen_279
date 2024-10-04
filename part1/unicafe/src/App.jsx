import { useState } from 'react'


function App() {
 // save clicks of each button to its own state
 const [good, setGood] = useState(0)
 const [neutral, setNeutral] = useState(0)
 const [bad, setBad] = useState(0)

 return (
   <div>
     <h1>give feedback</h1>
     <Button onUserClick={() => setGood(good + 1)} text="good" />
     <Button onUserClick={() => setNeutral(neutral + 1)} text="neutral" />
     <Button onUserClick={() => setBad(bad + 1)} text="bad" />

     <h1>statistics</h1>
     <Statistics good={good} neutral={neutral} bad={bad} />

   </div>
 )
}

const Button = ({ onUserClick, text }) => <button onClick={onUserClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>











export default App
