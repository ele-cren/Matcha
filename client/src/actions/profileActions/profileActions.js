export const getInformations = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/profile')
    xhr.send()
    xhr.onload = () => {
      console.log(xhr.status)
    }
  }
}

const updateInformations = (informations) => {

}
