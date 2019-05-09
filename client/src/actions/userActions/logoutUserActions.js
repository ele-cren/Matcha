import { LOGOUT } from "./userConsts";

export const logOutUser = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('DELETE', '/api/auth/logout')
    xhr.send()
    dispatch(logOut())
  }
}

const logOut = () => {
  return {
    type: LOGOUT
  }
}
