const initialNotification = ''
let notificationTimeout = 0

const notificationReducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.payload 

    case 'CLEAR_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: notification
    })

    // Clear timeout before setting up a new one
    clearTimeout(notificationTimeout)

    notificationTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        payload: ''
      })
    }, time * 1000)
    console.log(notificationTimeout)
  }
}

export default notificationReducer