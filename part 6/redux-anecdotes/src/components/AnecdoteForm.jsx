import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

export default function AnecdoteForm({ }) {
  const dispatch = useDispatch()
  const newAnecdoteRef = useRef()

  const handleAddNewAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = await anecdoteService.createNewOne(newAnecdoteRef.current.value)

    dispatch(addNewAnecdote(anecdote))
    dispatch(setNotification('New anecdote was added'))
    
    setTimeout(() => dispatch(removeNotification()), 5000)

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