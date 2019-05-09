import { FETCHED, FETCHING, UPDATE } from '../actions/profileActions/profileConsts'
import { LOGOUT } from '../actions/userActions/userConsts'

const defaultState = {
  mainInformations: {},
  informations: {},
  pictures: [],
  tags: []
}

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: true }
    case FETCHED:
      return { ...state, fetching: false }
    case UPDATE:
      return {
        ...state,
        mainInformations: action.payload.main,
        informations: action.payload.informations,
        pictures: action.payload.pictures,
        tags: action.payload.tags
      }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}

export default profileReducer
