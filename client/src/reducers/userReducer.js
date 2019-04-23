import { LOGIN, LOGOUT, FETCHING, FETCHED } from '../actions/userActions/userConsts'

const defaultState = {
  userId: '',
  fetching: true
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: action.payload.userId }
    case FETCHING:
      return { ...state, fetching: true }
    case FETCHED:
      return { ...state, fetching: false }
    case LOGOUT:
      return { ...state, userId: '' }
    default:
      return state
  }
}

export default userReducer