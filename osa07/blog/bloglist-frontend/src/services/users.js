import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

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

const usersCalls = { getAll }

export default usersCalls