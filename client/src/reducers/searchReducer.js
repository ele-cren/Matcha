import { SELECT, UPDATE } from '../actions/searchActions'

const defaultState = {
  selectedProfile: {},
  searchOpts: {
    gender: -1,
    online: 0,
    distance: [0, 400],
    age: [18, 30],
    score: [0, 100],
    tags: [0, 4],
    search: ''
  }
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT:
      return { ...state, selectedProfile: action.payload }
    case UPDATE:
        return { ...state, searchOpts: action.payload }
    default:
      return state
  }
}

export default searchReducer
