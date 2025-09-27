import { useState } from 'react'
import './App.css'

export function Button({text, handleFunction}) {
  return <button className={'buttons__button button-'+text.toLowerCase()} onClick={handleFunction}>{text}</button>
}

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const handleNextAnecdote = () => {
    if (selected === anecdotes.length-1) {
      setSelected(0);
      return;
    }

    setSelected(selected+1);
  }
  const handlePrevAnecdote = () => {
    if (selected === 0) {
      setSelected(anecdotes.length-1);
      return;
    }

    setSelected(selected-1);
  }
  const handleVote = () => {
    const copy = {...votes};
    copy[selected] = (copy[selected] || 0) + 1;
    setVotes(copy);
  }

  const pickMostVotedItem = () => {
    let maxIndex = 0;
    let max = votes[maxIndex];

    for (const vote in votes) {
      if (max < votes[vote] || !max) {
        max = votes[vote];
        maxIndex = vote;
      }
    }

    return max !== undefined ? maxIndex : undefined;
  }
  
  const mostVotedAnecdoteIndex = pickMostVotedItem();

  return (
    <main className='anecdotes'>
      <section className='anecdotes__display display'>
        <h2 className='display__title title'>Anecdote of the day</h2>

        <p className='display__anecdote'>{anecdotes[selected]}</p>
        <p className='display__votes-count'>
          Has {votes[selected] || 0} vote{votes[selected] > 1 || votes[selected] === undefined  ? 's' : null}
        </p>
      </section>

      <section className='anecdotes__buttons'>
        <Button text='Prev' handleFunction={handlePrevAnecdote}/>
        <Button text='Vote' handleFunction={handleVote}/>
        <Button text='Next' handleFunction={handleNextAnecdote}/>
      </section>

      <section className='anecdotes__most-votes most-votes'>
        <h2 className='most-votes__title title'>Anecdote with most votes</h2>

        <p className='most-votes__anecdote'>{anecdotes[mostVotedAnecdoteIndex] || 'Vote for any anecdote'}</p>
        {anecdotes[mostVotedAnecdoteIndex] && (
          <p className='most-votes__votes-count'>
            Has {votes[mostVotedAnecdoteIndex]} vote{votes[mostVotedAnecdoteIndex] > 1 ? 's' : null}
          </p>
          )
        }
      </section>
    </main>
  )
}

export default App