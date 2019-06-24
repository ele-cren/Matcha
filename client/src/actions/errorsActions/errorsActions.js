export const SHOW_ERRORS = 'errors:show'
export const CLEAN_ERRORS = 'errors:clean'

export const showErrors = (errors) => {
  return {
    type: SHOW_ERRORS,
    payload: {
      errors: errors
    }
  }
}

export const noErrors = () => {
  return {
    type: SHOW_ERRORS,
    payload: {
      errors: []
    }
  }
}

export const cleanErrors = () => {
  return {
    type: CLEAN_ERRORS
  }
}