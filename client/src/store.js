import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import errorsReducer from './reducers/errorsReducer'
import loveReducer from './reducers/loveReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  errors: errorsReducer,
  love: loveReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
