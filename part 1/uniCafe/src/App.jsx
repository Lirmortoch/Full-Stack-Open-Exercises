import { useState } from 'react'
import './App.css'

export function Button({children, func}) {
  return <button className='buttons__button' onClick={func}>{children}</button>
}

export function StatisticsLine({text, value = ''}) {
  
  if (value === '') {
    return <td>{text}</td>
  };

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
}

export function Statistics({good, neutral, bad}) {
  const all = good + neutral + bad;
  const average = ((good * 1) + (bad * -1)) / all;
  const positive = good / all * 100;

  if (all === 0) {
    return (
      <tr>
        <StatisticsLine text='No feedback given'/>
      </tr> 
    );
  }

  return (
    <>
      <tr className="feedback__value">
        <StatisticsLine text='good' value={good}/>
      </tr>
      <tr className="feedback__value">
        <StatisticsLine text='neutral' value={neutral}/>
      </tr>
      <tr className="feedback__value">
        <StatisticsLine text='bad' value={bad}/>
      </tr>
      <tr className="feedback__value">
        <StatisticsLine text='all' value={all}/>
      </tr>
      <tr className="feedback__value">
        <StatisticsLine text='average' value={average.toFixed(1)}/>
      </tr>
      <tr className="feedback__value">
        <StatisticsLine text='positive' value={`${positive.toFixed(1)} %`}/>
      </tr>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClick = () => {
    setGood(good+1);
  }
  const neutralClick = () => {
    setNeutral(neutral+1);
  }
  const badClick = () => {
    setBad(bad+1);
  }

  return (
    <>
      <header className='header'>
        <h1 className='header__title title'>Give Feedback</h1>
      </header>

      <section className='buttons'>
        <Button func={goodClick}>Good</Button>
        <Button func={neutralClick}>Neutral</Button>
        <Button func={badClick}>Bad</Button>
      </section>

      <section className='feedback'>
        <h2 className='feedback__title title'>Statistics</h2>

        <table>
          <tbody>
            <Statistics good={good} neutral={neutral} bad={bad}/>
          </tbody>
        </table>
      </section>
    </>
  )
}

export default App
