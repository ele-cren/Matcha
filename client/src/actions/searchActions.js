export const SELECT = 'search:select'

export const selectProfile = (profile) => {
  return {
    type: SELECT,
    payload: profile
  }
}