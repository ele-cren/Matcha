import { showErrors, noErrors } from '../errorsActions/errorsActions'
import { FETCHING, FETCHED } from '../userActions/userConsts'
const Messages = require('../../../languageLocalisation/authMessages.json')

export const tryRegister = (data, language) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const first_name = encodeURIComponent(data.first_name)
    const last_name = encodeURIComponent(data.last_name)
    const username = encodeURIComponent(data.username)
    const email = encodeURIComponent(data.email)
    const password = encodeURIComponent(data.password)
    const password_confirmation = encodeURIComponent(data.password_confirmation)
    const params = `first_name=${ first_name }&last_name=${ last_name }&username=${ username }&email=${ email }&password=${ password }&password_confirmation=${ password_confirmation }`
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/register')
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
    xhr.onload = () => {
      if (xhr.response.success) {
        dispatch(noErrors(Messages[language]["success_register"]))
      } else {
        dispatch(showErrors(xhr.response.errors, Messages[language]["fail_register"]))
      }
      dispatch({ type: FETCHED })
    }
  }
}