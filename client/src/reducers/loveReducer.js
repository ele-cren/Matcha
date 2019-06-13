import { UPDATE, CHECKED } from '../actions/loveActions/loveActionsConst'

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
    default:
      return state
  }
}

export default loveReducer
