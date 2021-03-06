import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import userReducer from './reducers/userReducer'
import profileReducer from './reducers/profileReducer'
import errorsReducer from './reducers/errorsReducer'
import loveReducer from './reducers/loveReducer'
import notificationsReducer from './reducers/notificationsReducer'
import languageReducer from './reducers/languageReducer'
import banReducer from './reducers/banReducer'
import searchReducer from './reducers/searchReducer'
import messagesReducer from './reducers/messagesReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  errors: errorsReducer,
  love: loveReducer,
  notifications: notificationsReducer,
  language: languageReducer,
  ban: banReducer,
  search: searchReducer,
  messages: messagesReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
