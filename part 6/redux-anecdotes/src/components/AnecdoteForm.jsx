import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { appendNote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm({ }) {
  const dispatch = useDispatch()
  const newAnecdoteRef = useRef()

  const handleAddNewAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = newAnecdoteRef.current.value

    dispatch(appendNote(anecdote))
    dispatch(showNotification('New anecdote was added'), 10)

    newAnecdoteRef.current.value = ''
  }

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={e => handleAddNewAnecdote(e)}>
        <div>
          <input ref={newAnecdoteRef} />
        </div>
        <button type='submit'>create</button>
      </form>
    </section>
  )
}