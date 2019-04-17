import store from '../store'

export const CLEAN = 'user:clean'

export const clean = () => {
  return {
    type: CLEAN,
    payload: {
      success: true,
      message: '',
      errors: {},
      userId: store.getState().userId
    }
  }
}