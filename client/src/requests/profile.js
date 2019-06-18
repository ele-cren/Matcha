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

export const updateInformations = (informations) => {
  const informationsJson = JSON.stringify(informations)
  const encodedInformations = encodeURIComponent(informationsJson)
  const data = `informations=${ encodedInformations }`
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', '/api/profile/informations')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(data)
}

export const updatePicture = (newUrl, lastUrl) => {
  const data = `newUrl=${ encodeURIComponent(newUrl) }&lastUrl=${ encodeURIComponent(lastUrl) }`
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', '/api/profile/pictures')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(data)
}