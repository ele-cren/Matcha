import { LOGIN, LOGOUT, FETCHING, FETCHED, FIRST_FETCH } from '../actions/userActions/userConsts'

const defaultState = {
  userId: ''
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: action.payload.userId }
    case FETCHING:
      return { ...state, fetched: false }
    case FETCHED:
      return { ...state, fetched: true }
      case FIRST_FETCH:
        return { ...state, first_fetch: true }
    case LOGOUT:
      return { ...state, userId: '' }
    default:
      return state
  }
}

export default userReducer