export const REGISTER = 'user:register'

export const tryRegister = (data) => {
  return dispatch => {
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
        dispatch(register(xhr.response.message))
      } else {
        dispatch(registerFail(xhr.response.errors, xhr.response.message))
      }
    }
  }
}

const registerFail = (errors, message) => {
  return {
    type: REGISTER,
    payload: {
      success: false,
      errors: errors,
      message: message
    }
  }
}

const register = (message) => {
  return {
    type: REGISTER,
    payload: {
      success: true,
      errors: {},
      message: message
    }
  }
}