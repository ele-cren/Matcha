import { UPDATE, CHECKED } from '../actions/loveActions/loveActionsConst'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = {
  meAboutUsers: [],
  usersAboutMe: []
}

const loveReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        meAboutUsers: action.payload.meAboutUsers,
        usersAboutMe: action.payload.usersAboutMe
      }
    case CHECKED: {
      return { ...state, checked: true }
    }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default loveReducer
