export const LOGOUT = 'user:logout'

// Implement log out request function
export const logOut = () => {
  return {
    type: LOGOUT
  }
}
