export const LOGOUT = 'user:logout'

// Implement log out request function
export const logOut = () => {
  return {
    type: LOGOUT,
    payload: {
      success: true,
      errors: {},
      message: 'You have been successfully logged out !'
    }
  }
}
