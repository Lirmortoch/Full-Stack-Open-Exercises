import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    updateVotes(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(a => a.id !== id ? a : changedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    addNewAnecdote(state, action) {
      return [...state, asObject(action.payload)].sort((a, b) => b.votes - a.votes)
    },
  }
})

export const { setAnecdotes, updateVotes, addNewAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer