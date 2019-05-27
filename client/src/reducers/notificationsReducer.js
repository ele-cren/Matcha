import { ADD, DELETE, UPDATE } from '../actions/notificationsActions/notifConsts'

const defaultState = []

const notificationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return [action.payload, ...state]
    case UPDATE:
      return state.map(x => {
        if (x.uuid === action.payload) {
          x.view = 1
        }
        return x
      })
    case DELETE:
      return state.filter(x => x.uuid !== action.payload)
    default:
      return state
  }
}

export default notificationsReducer
