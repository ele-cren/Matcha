export const getProfile = (userId) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profile/' + userId)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}

export const getLovers = (userId) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profile/' + userId + '/lovers')
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}