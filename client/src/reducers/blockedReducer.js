import { ADD, REMOVE } from '../actions/blockedActions/blockedActions'

const defaultState = []

const blockedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload]
    case REMOVE:
      return state.filter(x => x !== action.payload)
    default:
      return state
  }
}

export default blockedReducer
