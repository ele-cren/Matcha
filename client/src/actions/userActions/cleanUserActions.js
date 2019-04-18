export const CLEAN = 'user:clean'

export const clean = (userId) => {
  return {
    type: CLEAN,
    payload: {
      success: true,
      message: '',
      errors: {},
      userId: userId
    }
  }
}