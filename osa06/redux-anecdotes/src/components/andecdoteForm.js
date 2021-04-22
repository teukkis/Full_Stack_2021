import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    dispatch(sortAnecdotes())
    dispatch(setNotification(`You created ${newAnecdote}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
    </div>
  )  
}

export default AnecdoteForm