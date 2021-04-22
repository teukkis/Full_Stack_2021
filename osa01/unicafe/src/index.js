import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.unit}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral, all, text}) => {
    
    let avg = (good - bad) / all
    let positives = (all - neutral - bad) / all * 100

    if (all === 0) {
       return (
        <div>
            No feedback given
        </div>
       )
    }
    
    return( 
        <table>
            <tbody>
              <StatisticsLine text="good" value={good} unit=""/>
              <StatisticsLine text="neutral" value={neutral} unit=""/>
              <StatisticsLine text="bad" value={bad} unit=""/>
              <StatisticsLine text="all" value={all} unit=""/>
              <StatisticsLine text="average" value={avg} unit=""/>
              <StatisticsLine text="positive" value={positives} unit="&#37;"/>
            </tbody>    
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleClickGood = () => {
        setGood(good + 1)
        setAll(all + 1)
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }

    const handleClickBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (
        <div>
            <div>
                <h1>give feedback</h1>
            </div>
            <div>
                <Button handleClick={handleClickGood} text='good'/>
                <Button handleClick={handleClickNeutral} text='neutral'/>
                <Button handleClick={handleClickBad} text='bad'/>
                <h1>statistics</h1>
                <Statistics 
                    good={good} 
                    neutral={neutral}
                    bad={bad}
                    all={all}
                    />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)