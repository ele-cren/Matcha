import { LOGIN } from '../actions/loginUserActions'
import { LOGOUT } from '../actions/logoutUserActions'
import { REGISTER } from '../actions/registerUserActions'
import { CLEAN } from '../actions/cleanUserActions'

const defaultState = {
  success: true,
  errors: {},
  message: '',
  userId: ''
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGOUT:
      return ''
    case LOGIN:
      return action.payload
    case REGISTER:
      return action.payload
    case CLEAN:
      return action.payload
    default:
      return state
  }
}

export default userReducer