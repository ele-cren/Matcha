export const SHOW_ERRORS = 'errors:show'
export const CLEAN_ERRORS = 'errors:clean'

export const showErrors = (errors, message) => {
  return {
    type: SHOW_ERRORS,
    payload: {
      errors: errors,
      message: message
    }
  }
}

export const noErrors = (message) => {
  return {
    type: SHOW_ERRORS,
    payload: {
      errors: [],
      message: message
    }
  }
}

export const cleanErrors = () => {
  return {
    type: CLEAN_ERRORS
  }
}