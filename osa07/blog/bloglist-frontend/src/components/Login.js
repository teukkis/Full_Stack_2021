import React, { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'


const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username: username, password: password }))
    } catch (e) {
      console.log('error', e)
      setMessage('Invalid credentials')
      setTimeout( () => setMessage(''), 3000 )
      setPassword('')
      setUsername('')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      {message === '' ? <div></div> : <div className='notif'>{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="loginfield">
          <label id="login_username_label">username</label>
          <input
            type="text"
            id="login_username_input"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label id="login_password_label">password</label>
          <input
            type="password"
            id="login_password_input"
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