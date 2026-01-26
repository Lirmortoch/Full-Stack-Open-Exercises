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

export default { getAll, createNewOne }