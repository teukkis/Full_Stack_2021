import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'

const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  return (
    <div>
      { user !== null ? <Blogs setUser={setUser} user={user}/> : <Login setUser={setUser}/> }
    </div>
  )
}

export default App