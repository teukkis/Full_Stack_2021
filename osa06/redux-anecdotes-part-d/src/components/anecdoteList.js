import React from 'react'
import { connect } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'

const AnecdoteList = (props) => {

  const vote = (id, content) => {
    props.addVote(id)
    props.sortAnecdotes()
    props.setNotification(`you voted '${content}'`, 5)
  }

  return (
    <div>
      {props.notification !== '' ? <Notification/> : <div></div>}
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
    filter: state.filter,
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  addVote,
  sortAnecdotes,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)