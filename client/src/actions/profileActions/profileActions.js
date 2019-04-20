import { FETCHING, FETCHED, FIRST_FETCH, UPDATE } from './profileConsts'

export const getInformations = (isFirstDone) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/profile')
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(updateInformations(xhr.response))
      }
      dispatch({ type: FETCHED })
      if (!isFirstDone) {
        dispatch({ type: FIRST_FETCH })
      }
    }
  }
}

const updateInformations = (results) => {
  return {
    type: UPDATE,
    payload: results
  }
}
