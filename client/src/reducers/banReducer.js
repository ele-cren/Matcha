import { ADD, REMOVE, REPORT } from '../actions/banActions/banActions'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = {
  blockedUsers: [],
  reportedUsers: []
}

const blockedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, blockedUsers: [...state.blockedUsers, action.payload] }
    case REMOVE:
      return { ...state, blockedUsers: state.blockedUsers.filter(x => x !== action.payload) }
    case REPORT:
      return { ...state, reportedUsers: [...state.reportedUsers, action.payload] }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default blockedReducer
