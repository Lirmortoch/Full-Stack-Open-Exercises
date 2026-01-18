import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesFilter from './components/AnecdotesFilter'

import './App.css'

const App = () => {
  return (
    <main>
      <h1>Anecdotes!</h1>
      
      <AnecdotesFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </main>
  )
}

export default App
