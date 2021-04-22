import React, { useEffect } from 'react'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import ApplicationContainer from './components/ApplicationContainer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('currentUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])
  
  return (
    <div>
      { user !== null ? <ApplicationContainer/> : <Login/> }
    </div>
  )
}

export default App