import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

import './App.css'
import Notification from './components/Notification'

const App = () => {
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
