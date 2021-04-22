import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(newAnecdote)
    props.sortAnecdotes()
    props.setNotification(`You created ${newAnecdote}`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  sortAnecdotes,
  setNotification
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)