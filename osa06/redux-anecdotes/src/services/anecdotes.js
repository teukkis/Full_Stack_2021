import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(`${baseUrl}?_sort=votes&_order=desc`)
  return response.data
}

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const voteAnecdote = async (voteId) => {
  const anecdoteToEdit = await axios.get(`${baseUrl}/${voteId}`)
  
  const response = await axios.put(`${baseUrl}/${voteId}`, { ...anecdoteToEdit.data, votes: anecdoteToEdit.data.votes + 1})
  return response.data
}

export default { getAnecdotes, createAnecdote, voteAnecdote }

