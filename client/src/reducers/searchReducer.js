import { UPDATE, SAVE_SEARCHED, SAVE_SUGGESTED, saveSearched } from '../actions/searchActions'

const defaultState = {
  searchOpts: {
    gender: -1,
    online: 0,
    distance: [0, 400],
    age: [18, 30],
    score: [0, 100],
    tags: [0, 4],
    search: ''
  },
  lastSuggested: [],
  lastSearched: []
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
        return { ...state, searchOpts: action.payload }
    case SAVE_SUGGESTED:
        return { ...state, lastSuggested: action.payload }
    case SAVE_SEARCHED:
        return { ...state, lastSearched: action.payload }
    default:
      return state
  }
}

export default searchReducer
