import { FETCHING, FETCHED, UPDATE, FETCHED_LOAD, FETCHING_LOAD } from './profileConsts'

export const getInformations = (isPageLoading) => {
  return dispatch => {
    dispatch({ type: isPageLoading ? FETCHING_LOAD : FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/profile')
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(updateInformations(xhr.response))
      }
      dispatch({ type: isPageLoading ? FETCHED_LOAD : FETCHED })
    }
  }
}

const updateInformations = (results) => {
  return {
    type: UPDATE,
    payload: results
  }
}
