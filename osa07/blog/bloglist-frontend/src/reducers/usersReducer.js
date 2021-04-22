import usersService from '../services/users'

const usersReducer = (state = null, action) => {

  switch(action.type) {
    case 'SET_USERS':
      return action.payload

    default:
      return state
    }
}

export const setUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }
}

export default usersReducer