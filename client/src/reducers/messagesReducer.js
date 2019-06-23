import { ADD_RECEIVED, ADD_SENT, GET } from '../actions/messagesActions'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = {
  messagesISent: [],
  messagesIReceived: []
}

const messagesReducer = (state = defaultState, action)  => {
  switch (action.type) {
    case ADD_RECEIVED:
      return { ...state, messagesIReceived: [...state.messagesIReceived, action.payload ] }
    case ADD_SENT:
      return { ...state, messagesISent: [...state.messagesISent, action.payload] }
    case GET:
      return {...action.payload, checked: true }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default messagesReducer
