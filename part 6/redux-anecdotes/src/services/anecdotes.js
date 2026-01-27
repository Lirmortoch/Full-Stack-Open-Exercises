const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (10000 * Math.random()).toFixed(0)
const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}
const getOne = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch one anecdote')
  }

  return await response.json()
}

const createNewOne = async (content) => {
  const anecdote = asObject(content)

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(anecdote),
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to add new anecdote')
  }

  return await response.json()
}

const updatingVotes = async (id) => {
  const anecdoteToChange = await getOne(id)
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  }

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(changedAnecdote),
  }
  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update votes of anecdote')
  }

  return await response.json()
}

export default { getAll, createNewOne, getOne, updatingVotes, }