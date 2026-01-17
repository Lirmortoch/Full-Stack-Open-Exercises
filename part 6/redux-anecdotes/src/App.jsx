import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const newAnecdoteRef = useRef()

  const vote = id => {
    console.log('vote', id)

    dispatch({
      type: 'UPDATE_VOTES',
      payload: {
        id,
      },
    })
  }

  const newAnecdote = e => {
    e.preventDefault()

    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        anecdote: newAnecdoteRef.current.value,
      },
    })
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
