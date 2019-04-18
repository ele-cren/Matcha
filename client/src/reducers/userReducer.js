import { LOGIN } from '../actions/userActions/loginUserActions'
import { LOGOUT } from '../actions/userActions/logoutUserActions'
import { REGISTER } from '../actions/userActions/registerUserActions'
import { CLEAN } from '../actions/userActions/cleanUserActions'

const defaultState = {
  success: true,
  errors: {},
  message: '',
  userId: ''
}

const userReducer = (state = defaultState, action) => {
  if (action.type === LOGIN || action.type === REGISTER || action.type === CLEAN) {
    console.log(action.payload.userId)
    return action.payload
  } else if (action.type === LOGOUT) {
    return defaultState
  }
  return state
}

export default userReducer