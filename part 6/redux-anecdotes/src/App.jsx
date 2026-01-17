import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <main>
      <h1>Anecdotes</h1>
      
      <AnecdoteList/>
      <AnecdoteForm />
    </main>
  )
}

export default App
