import { UPDATE } from '../actions/languageActions/languageConsts'

const defaultState = "FR"

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
      return action.payload
    default:
      return state
  }
}

export default languageReducer
