import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      return anecdotes.sort((a, b) => b.votes - a.votes)
    },
    updateVotes(state, action) {
      const changedAnecdote = action.payload

      return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    addNewAnecdote(state, action) {
      return [...state, action.payload].sort((a, b) => b.votes - a.votes)
    },
  }
})

const { setAnecdotes, addNewAnecdote, updateVotes } = anecdotesSlice.actions

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
const appendNote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNewOne(content)
    dispatch(addNewAnecdote(anecdote))
  }
}
const updateAnecdoteVotes = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.updatingVotes(id)
    dispatch(updateVotes(anecdote))
  }
}

export { initializeAnecdotes, appendNote, updateAnecdoteVotes }
export default anecdotesSlice.reducer