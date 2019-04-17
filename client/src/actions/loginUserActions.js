export const LOGIN = 'user:login'
export const LOGOUT = 'user:logout'

export const tryLogIn = (data) => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/login')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    const login = encodeURIComponent(data.login)
    const pass = encodeURIComponent(data.password)
    const params = `login=${ login }&password=${ pass }`
    xhr.send(params)
    xhr.onload= () => {
      if (xhr.success) {
        dispatch(logIn(xhr.response.user, xhr.response.message))
      }
      else {
        dispatch(logInFail(xhr.response.errors, xhr.response.message))
      }
    }
  }
}

const logIn = (userId, message) => {
  return {
    type: LOGIN,
    payload: {
      success: true,
      message: message,
      userId: userId
    }
  }
}

const logInFail = (errors, message) => {
  return {
    type: LOGIN,
    payload: {
      success: false,
      errors: errors,
      message: message
    }
  }
}

