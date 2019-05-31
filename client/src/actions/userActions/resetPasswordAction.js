import { noErrors, showErrors } from '../errorsActions/errorsActions'

export const resetPass = (login) => {
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
        dispatch(noErrors('The password has been successfully sent'))
      } else {
        dispatch(showErrors(xhr.response.errors, 'Reset failed'))
      }
    }
  }
}