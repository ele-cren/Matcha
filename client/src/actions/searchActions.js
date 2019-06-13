export const SELECT = 'search:select'
export const UPDATE = 'search:update'

export const selectProfile = (profile) => {
  return {
    type: SELECT,
    payload: profile
  }
}

export const updateOptions = (options) => {
  return {
    type: UPDATE,
    payload: options
  }
}