const Errors = require('../../languageLocalisation/errors.json')

export const getLoginErrors = (errors, language) => {
  const loginErrors = {}
  const possibleErrors = {
    loginInputErrors: [9, 11, 12],
    passwordInputErrors: [13, 10]
  }
  errors.forEach(x => {
    if (possibleErrors.loginInputErrors.includes(x)) {
      loginErrors.login = Errors[language][x]
    }
    if (possibleErrors.passwordInputErrors.includes(x)) {
      loginErrors.password = Errors[language][x]
    }
  })
  return loginErrors
}

export const getRegisterErrors = (errors, language) => {
  const registerErrors = {}
  const possibleErrors = {
    firstNameErrors: [5],
    lastNameErrors: [6],
    emailErrors: [1, 8],
    usernameErrors: [2, 7],
    passwordErrors: [3, 4],
  }
  errors.forEach(x => {
    registerErrors.email = possibleErrors.emailErrors.includes(x) ? Errors[language][x] : registerErrors.email
    registerErrors.username = possibleErrors.usernameErrors.includes(x) ? Errors[language][x] : registerErrors.username
    registerErrors.first_name = possibleErrors.firstNameErrors.includes(x) ? Errors[language][x] : registerErrors.first_name
    registerErrors.last_name = possibleErrors.lastNameErrors.includes(x) ? Errors[language][x] : registerErrors.last_name
    registerErrors.password = possibleErrors.passwordErrors.includes(x) ? Errors[language][x] : registerErrors.password
  })
  return registerErrors
}

export const getResetErrors = (errors, language) => {
  const resetErrors = {}
  const possibleErrors = {
    loginErrors: [11]
  }
  errors.forEach(x => {
    resetErrors.login = possibleErrors.loginErrors.includes(x) ? Errors[language][x] : resetErrors.login
  })
  return resetErrors
}

export const getConfirmationErrors = (errors, language) => {
  const confirmationErrors = {}
  const possibleErrors = {
    userErrors: [14, 11, 12]
  }
  errors.forEach(x => {
    confirmationErrors.user = possibleErrors.userErrors.includes(x) ? Errors[language][x] : confirmationErrors.user
  })
  return confirmationErrors
}