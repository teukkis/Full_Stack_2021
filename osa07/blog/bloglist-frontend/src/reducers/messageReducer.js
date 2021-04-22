
const messageReducer = (state = null, action) => {

  switch(action.type) {
    case 'SET_MESSAGE':
      return action.payload

    default:
      return state
    }
}

export const setMessage = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      payload: message
    })
  }
}

export default messageReducer