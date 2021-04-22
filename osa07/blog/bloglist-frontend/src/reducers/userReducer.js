import loginService from '../services/login'

const userReducer = (state = null, action) => {

  switch(action.type) {
    case 'SET_USER':
      return action.payload

    case 'LOGIN_USER':
      return action.payload

    default:
      return state
    }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('currentUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN_USER',
      payload: user
    })
  }
}

export default userReducer