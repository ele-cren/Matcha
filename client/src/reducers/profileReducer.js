import { FETCHED, FETCHING, FIRST_FETCH, UPDATE } from '../actions/profileActions/profileConsts'

const defaultState = {
  mainInformations: {},
  informations: {},
  pictures: []
}

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetched: false }
    case FETCHED:
      return { ...state, fetched: true }
    case FIRST_FETCH:
      return { ...state, first_fetch: true }
    case UPDATE:
      return {
        ...state,
        mainInformations: action.payload.main,
        informations: action.payload.informations,
        pictures: action.payload.pictures
      }
    default:
      return state
  }
}

export default profileReducer
