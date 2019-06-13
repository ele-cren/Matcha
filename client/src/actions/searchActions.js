export const UPDATE = 'search:update'
export const SAVE_SEARCHED = 'search:saveSearched'
export const SAVE_SUGGESTED = 'search:saveSuggested'

export const updateOptions = (options) => {
  return {
    type: UPDATE,
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