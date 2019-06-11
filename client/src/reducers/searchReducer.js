import { SELECT } from '../actions/searchActions'

const defaultState = {
  selectedProfile: {}
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT:
      return { ...state, selectedProfile: action.payload }
    default:
      return state
  }
}

export default searchReducer
