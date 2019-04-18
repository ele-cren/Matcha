import { combineReducers, createStore, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
