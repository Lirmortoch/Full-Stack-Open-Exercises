import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes, addNewAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const newAnecdoteRef = useRef()

  const vote = id => {
    console.log('vote', id)

    dispatch(updateVotes(id))
  }

  const newAnecdote = e => {
    e.preventDefault()
    const anecdote = newAnecdoteRef.current.value

    dispatch(addNewAnecdote(anecdote))

    newAnecdoteRef.current.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>
      <form onSubmit={e => newAnecdote(e)}>
        <div>
          <input ref={newAnecdoteRef} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
