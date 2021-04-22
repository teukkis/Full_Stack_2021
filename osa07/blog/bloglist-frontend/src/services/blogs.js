import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const token = getToken()
  if (token) {
    const response = await axios.get(
      baseUrl,
      {
        headers: {
          Authorization: token
        }
      }
    )
    return response.data
  }
  else {
    return false
  }
}


const createBlog = async (title, url, author) => {
  const token = getToken()
  if (token) {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, { title, url, author } , config)
    return response.data
  }
  return false
}


const addOneLike = async (blogId, data) => {
  const token = getToken()
  if (token) {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${blogId}`, data, config)
    return response.data
  }
  return false
}

const removeBlog = async (blogId) => {
  const token = getToken()
  if (token) {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
  }
  return false
}


const addComment = async (blogId, data) => {
  const token = getToken()
  if (token) {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${blogId}/comments`, data, config)
    return response.data
  }
  return false
}


const getToken = () => {
  const currentUserJSON = window.localStorage.getItem('currentUser')
  if (currentUserJSON) {
    const currentUser = JSON.parse(currentUserJSON)
    return `Bearer ${currentUser.token}`
  }
  else {
    return null
  }
}

const blogCalls = { getAll, createBlog, addOneLike, removeBlog, addComment }

export default blogCalls
