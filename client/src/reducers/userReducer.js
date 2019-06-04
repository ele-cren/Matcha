import { LOGIN, LOGOUT, FETCHING, FETCHED, CHECKED } from '../actions/userActions/userConsts'

const defaultState = {
  user: {}
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload }
    case FETCHING:
      return { ...state, fetching: true }
    case FETCHED:
      return { ...state, fetching: false }
    case CHECKED:
      return { ...state, checked: true }
    case LOGOUT:
      return { ...state, user: {} }
    default:
      return state
  }
}

export default userReducer