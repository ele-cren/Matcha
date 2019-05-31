export const registerValidation = (payload) => {
  let errors = []
  const emailRegex = /(^[A-z0-9]+)(([._\-A-z0-9]+))@[\-A-z0-9]+?\.([\-A-z0-9]+\.)?[a-z]+$/
  const passRegex = /^\S{8,20}$/
  const userRegex = /^(?=.{5,20}$)(?!.*[_.\-]{2})[a-zA-Z0-9._\-]+$/
  let isValid = true

  if (!payload.email || !emailRegex.test(payload.email) || payload.email.startsWith('_')) {
    errors = [...errors, 1]
    isValid = false
  }
  if (!payload.username || !userRegex.test(payload.username)) {
    errors = [...errors, 2]
    isValid = false
  }
  if (!payload.password || !passRegex.test(payload.password)) {
    errors = [...errors, 3]
    isValid = false
  }
  if (payload.password !== payload.password_confirmation) {
    isValid = false
    errors = [...errors, 4]
  }
  if (!payload.first_name) {
    errors = [...errors, 5]
    isValid = false
  }
  if (!payload.last_name) {
    errors = [...errors, 6]
    isValid = false
  }

  return {
    success: isValid,
    errors: errors
  }
}

export const loginValidation = payload => {
  let errors = []
  let isValid = true
  
  if (!payload.login) {
    isValid = false
    errors = [...errors, 9]
  }
  if (!payload.password) {
    isValid = false
    errors = [...errors, 10]
  }

  return {
    success: isValid,
    errors: errors,
  }
}