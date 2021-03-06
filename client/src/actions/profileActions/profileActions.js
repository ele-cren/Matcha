import { FETCHING, FETCHED, UPDATE } from './profileConsts'

export const getInformations = (userId) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/profile/' + userId)
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(updateInformations(xhr.response))
      }
      dispatch({ type: FETCHED })
    }
  }
}

export const updateInformations = (results) => {
  return {
    type: UPDATE,
    payload: results
  }
}
