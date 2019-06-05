import { SHOW_ERRORS, CLEAN_ERRORS } from '../actions/errorsActions/errorsActions'

const defaultState = {
  errors: []
}

const errorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ERRORS:
      return action.payload
    case CLEAN_ERRORS:
      return defaultState
    default:
      return state
  }
}

export default errorsReducer