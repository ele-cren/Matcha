import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import errorsReducer from './reducers/errorsReducer'
import loveReducer from './reducers/loveReducer'
import notificationsReducer from './reducers/notificationsReducer'
import languageReducer from './reducers/languageReducer'
import blockedReducer from './reducers/blockedReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  errors: errorsReducer,
  love: loveReducer,
  notifications: notificationsReducer,
  language: languageReducer,
  blocked: blockedReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
