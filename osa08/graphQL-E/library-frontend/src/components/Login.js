import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)


  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      console.log(result.data)
      const token = result.data.login.value
      setToken(token)
      props.setUser(token)
      props.setPage('authors')
      localStorage.setItem('currentUser', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    login({variables: {username, password}})
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button id="login_button" type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default Login