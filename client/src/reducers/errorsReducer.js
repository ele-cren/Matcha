import { SHOW_ERRORS, CLEAN_ERRORS } from '../actions/errorsActions/errorsActions'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = {
  errors: []
}

const errorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ERRORS:
      return action.payload
    case CLEAN_ERRORS:
      return defaultState
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default errorsReducer