import { noErrors, showErrors } from '../errorsActions/errorsActions'
import { FETCHING, FETCHED } from '../userActions/userConsts'
const Messages = require('../../../languageLocalisation/authMessages.json')

export const confirmUser = (userId, language) => {
  return dispatch => {
    dispatch({ type: FETCHING })
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `/api/confirmation/${ userId }`)
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(noErrors(Messages[language]["success_confirm"]))
      } else {
        dispatch(showErrors(xhr.response.errors, Messages[language]["fail_confirm"]))
      }
      dispatch({ type: FETCHED })
    }
  }
}