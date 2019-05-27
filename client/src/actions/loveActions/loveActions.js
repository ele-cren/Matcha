import { UPDATE } from './loveActionsConst'

export const getLoveInformations = (userId) => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/love/infos/' + userId)
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(updateLove(xhr.response))
      }
    }
  }
}

export const updateLove = (infos) => {
  return {
    type: UPDATE,
    payload: infos
  }
}