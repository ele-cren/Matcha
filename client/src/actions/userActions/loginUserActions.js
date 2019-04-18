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
      if (xhr.response.success) {
        dispatch(logIn(xhr.response.user, xhr.response.message))
      } else {
        dispatch(logInFail(xhr.response.errors, xhr.response.message))
      }
    }
  }
}

export const checkLogged = () => {
  dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/auth/logged')
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(logIn(xhr.responseText, ''))
      } else {
        dispatch(logInFail({}, ''))
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
      errors: {},
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
      message: message,
      userId: ''
    }
  }
}

