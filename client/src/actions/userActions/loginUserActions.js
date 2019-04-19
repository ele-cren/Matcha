import { showErrors, noErrors } from '../errorsActions/errorsActions'
import { LOGIN, FETCHING, FETCHED, FIRST_FETCH } from './userConsts'

export const tryLogIn = (data) => {
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
        dispatch(noErrors(xhr.response.message))
      } else {
        dispatch(showErrors(xhr.response.errors, xhr.response.message))
      }
      dispatch({ type: FETCHED })
    }
  }
}

export const checkLogged = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/auth/logged')
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(logIn(xhr.responseText, ''))
      }
      dispatch({ type: FIRST_FETCH })
    }
  }
}

const logIn = (userId) => {
  return {
    type: LOGIN,
    payload: {
      userId: userId
    }
  }
}
