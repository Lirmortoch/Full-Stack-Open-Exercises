import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'

export default function AnecdoteList({  }) {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVote = id => {
    console.log('vote', id)

    dispatch(updateVotes(id))
  }

  return (
    <section>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </section>
  )
}