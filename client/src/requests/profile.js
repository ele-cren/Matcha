export const getProfile = (userId) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profile/' + userId)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}