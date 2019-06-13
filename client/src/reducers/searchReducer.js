import { UPDATE_SEARCH_OPTS, SAVE_SEARCHED, SAVE_SUGGESTED, UPDATE_SUGGEST_OPTS } from '../actions/searchActions'

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
  suggestOpts: {
    distance: [0, 400],
    age: [18, 30],
    score: [0, 100],
    tags: [0, 4],
  },
  lastSuggested: [],
  lastSearched: []
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_OPTS:
        return { ...state, searchOpts: action.payload }
    case UPDATE_SUGGEST_OPTS:
      return { ...state, suggestOpts: action.payload }
    case SAVE_SUGGESTED:
        return { ...state, lastSuggested: action.payload }
    case SAVE_SEARCHED:
        return { ...state, lastSearched: action.payload }
    default:
      return state
  }
}

export default searchReducer
