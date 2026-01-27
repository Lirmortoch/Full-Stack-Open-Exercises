import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdoteVotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

export default function AnecdoteList({  }) {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes
    }
    else {
      const re = new RegExp(`${filter}`, 'i')
      return anecdotes.filter(anc => anc.content.match(re))
    }
  })

  const handleVote = anecdote => {
    dispatch(updateAnecdoteVotes(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <section>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} className='anecdote'>
          <div>
            <span>{anecdote.content}</span>
            <span>
              <button 
                onClick={() => handleVote(anecdote)}
                className='anecdote__button vote-btn'
              >
                vote
              </button>
            </span>
          </div>
          <div>
            has {anecdote.votes}
          </div>
        </div>
      ))}
    </section>
  )
}