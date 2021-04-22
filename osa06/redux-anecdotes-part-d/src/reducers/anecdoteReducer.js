import anecdoteService from '../services/anecdotes'

const sortDescending = (anecdotes) => {
  const sortedByVotes = anecdotes.sort(function(a, b){
    return a.votes-b.votes
  })
  return sortedByVotes.reverse()
}

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
    case 'ADD_VOTE':
      return state.map(v => v.id === action.payload ? { ...v, votes: v.votes + 1} : v)

    case 'CREATE_NEW_ANECDOTE':
      return state.concat(action.payload)

    case 'ORDER_BY_VOTES':
      return sortDescending(state)

    case 'INITIALIZE_ANECDOTES':
      return action.payload

    default:
      return state
  }
}

export const addVote = (voteId) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(voteId)
    dispatch({
      type: 'ADD_VOTE',
      payload: voteId
    }) 
  }
}

export const createAnecdote = (anecdoteContent) => {
  const newAnecdote = {
    content: anecdoteContent,
    id: getId(),
    votes: 0
  }
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(newAnecdote)
    dispatch({
      type: 'CREATE_NEW_ANECDOTE',
      payload: anecdote
    })
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'ORDER_BY_VOTES',
    payload: undefined
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      payload: anecdotes
    })
  }
}
export default anecdoteReducer