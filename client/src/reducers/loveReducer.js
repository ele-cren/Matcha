import { UPDATE } from '../actions/loveActions/loveActionsConst'

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
      default:
        return state
  }
}

export default loveReducer
