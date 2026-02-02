import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { addNewAnecdote } from '../requests'

import { useContext } from 'react'
import NotificationCtx from '../NotificationContext'
import { showNotification } from '../utils/showNotification'

const AnecdoteForm = ({  }) => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationCtx)

  const newNoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error, anecdote) => {
      showNotification(notificationDispatch, error.message, 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newNoteMutation.mutate({ content, votes: 0 })

    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
