import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(filter)))

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(sortAnecdotes())
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {notification !== '' ? <Notification/> : <div></div>}
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList