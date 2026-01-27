import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

import './App.css'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <main>
      <h1>Anecdotes!</h1>
      <Notification />

      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </main>
  )
}

export default App
