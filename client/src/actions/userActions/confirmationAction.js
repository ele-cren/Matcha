import { noErrors, showErrors } from '../errorsActions/errorsActions'
import { FETCHING, FETCHED } from '../userActions/userConsts'

export const confirmUser = (userId) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `/api/confirmation/${ userId }`)
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(noErrors('User successfully confirmed')) //Update localisation
      } else {
        dispatch(showErrors(xhr.response.errors, 'User not confirmed'))
      }
      dispatch({ type: FETCHED })
    }
  }
}