import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  blogs: blogReducer,
  users: usersReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store