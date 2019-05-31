import { showErrors, noErrors } from '../errorsActions/errorsActions'
import { LOGIN, FETCHING, FETCHED, CHECKED } from './userConsts'
const Messages = require('../../../languageLocalisation/authMessages.json')

export const tryLogIn = (data, language) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/login')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    const login = encodeURIComponent(data.login)
    const pass = encodeURIComponent(data.password)
    const params = `login=${ login }&password=${ pass }`
    xhr.send(params)
    xhr.onload= () => {
      if (xhr.response.success) {
        dispatch(logIn(xhr.response.user))
        dispatch(noErrors(Messages[language]["success_login"]))
      } else {
        dispatch(showErrors(xhr.response.errors, Messages[language]["fail_login"]))
      }
      dispatch({ type: FETCHED })
    }
  }
}

export const checkLogged = () => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/auth/logged')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(logIn(xhr.response))
      }
      dispatch({ type: FETCHED })
      dispatch({ type: CHECKED })
    }
  }
}

const logIn = (user) => {
  return {
    type: LOGIN,
    payload: user
  }
}
