export const UPDATE_SEARCH_OPTS = 'search:updateSearchOpts'
export const UPDATE_SUGGEST_OPTS = 'search:updatSuggestOpts'
export const SAVE_SEARCHED = 'search:saveSearched'
export const SAVE_SUGGESTED = 'search:saveSuggested'

export const updateSearchOptions = (options) => {
  return {
    type: UPDATE_SEARCH_OPTS,
    payload: options
  }
}

export const updateSuggestOptions = (options) => {
  return {
    type: UPDATE_SUGGEST_OPTS,
    payload: options
  }
}

export const saveSearched = (profiles) => {
  return {
    type: SAVE_SEARCHED,
    payload: profiles
  }
}

export const saveSuggested = (profiles) => {
  return {
    type: SAVE_SUGGESTED,
    payload: profiles
  }
}