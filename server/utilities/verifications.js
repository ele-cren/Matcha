export const registerValidation = (payload) => {
  let errors = {}
  const emailRegex = /(^[A-z0-9]+)(([._\-A-z0-9]+))@[\-A-z0-9]+?\.([\-A-z0-9]+\.)?[a-z]+$/
  const passRegex = /^\S{8,20}$/
  const userRegex = /^(?=.{5,20}$)(?!.*[_.\-]{2})[a-zA-Z0-9._\-]+$/
  let isValid = true

  if (!payload.email || !emailRegex.test(payload.email) || payload.email.startsWith('_')) {
    errors.email = 'Please, provide a valid email address'
    isValid = false
  }
  if (!payload.username || !userRegex.test(payload.username)) {
    errors.username = 'Please, provide a valid username. 5 - 20 characters, [._-] digits and letters'
    isValid = false
  }
  if (!payload.password || !passRegex.test(payload.password)) {
    errors.password = 'Please, provide a password between 8 and 20 characters'
    isValid = false
  }
  if (payload.password !== payload.password_confirmation) {
    isValid = false
    errors.password = 'Password and password confirmation don\'t match'
  }
  if (!payload.first_name) {
    errors.first_name = 'Please, provide your first name'
    isValid = false
  }
  if (!payload.last_name) {
    errors.last_name = 'Please, provide your last name'
    isValid = false
  }

  return {
    success: isValid,
    message: isValid ? '' : 'The form contains some errors. Please fix it',
    errors: errors
  }
}

export const loginValidation = payload => {
  let errors = {}
  let isValid = true
  
  if (!payload.login) {
    isValid = false
    errors.login = 'Please provide your email address or your username'
  }
  if (!payload.password) {
    isValid = false
    errors.password = 'Please provide your password'
  }

  return {
    success: isValid,
    errrors: errors,
    message: isValid ? '' : 'The form contains some errors, please fix it'
  }
}