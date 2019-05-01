import { FETCHED, FETCHING, UPDATE, FETCHING_LOAD, FETCHED_LOAD } from '../actions/profileActions/profileConsts'

const defaultState = {
  mainInformations: {},
  informations: {},
  pictures: []
}

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: true }
    case FETCHED:
      return { ...state, fetching: false }
    case FETCHING_LOAD:
      return { ...state, fetching_load: true}
    case FETCHED_LOAD:
      return { ...state, fetching_load: false }
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
