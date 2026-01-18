import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'

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

  const handleVote = id => {
    dispatch(updateVotes(id))
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
                onClick={() => handleVote(anecdote.id)}
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