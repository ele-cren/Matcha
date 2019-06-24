import { UPDATE } from '../actions/languageActions/languageConsts'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = "FR"

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default languageReducer
