import { FETCHED, FETCHING, UPDATE } from '../actions/profileActions/profileConsts'

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
    default:
      return state
  }
}

export default profileReducer
