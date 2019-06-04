import { noErrors, showErrors } from '../errorsActions/errorsActions'
const Messages = require('../../../languageLocalisation/authMessages.json')

export const resetPass = (login, language) => {
  return dispatch => {
    login = encodeURIComponent(login)
    const params = `login=${login}`
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/reset_pass')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.send(params)
    xhr.onload = () => {
      if (xhr.response.success) {
        dispatch(noErrors(Messages[language]["success_reset"]))
      } else {
        dispatch(showErrors(xhr.response.errors, Messages[language]["fail_reset"]))
      }
    }
  }
}