import { combineReducers, createStore, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const store = createStore(userReducer, applyMiddleware(thunk))

export default store
