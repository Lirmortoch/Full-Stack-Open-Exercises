import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
      return [...state, action.payload].sort((a, b) => b.votes - a.votes)
    },
  }
})

const { setAnecdotes, } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { updateVotes, addNewAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer