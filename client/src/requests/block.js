export const blockUser = (blockedUser) => {
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', 'api/blocked')
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const encodedBlocked = encodeURIComponent(blockedUser)
  const data = `blockedUser=${ encodedBlocked }`
  xhr.send(data)
  return xhr
}

export const removeBlockedUser = (blockedUser) => {
  const xhr = new XMLHttpRequest()
  xhr.open('DELETE', 'api/blocked')
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const encodedBlocked = encodeURIComponent(blockedUser)
  const data = `blockedUser=${ encodedBlocked }`
  xhr.send(data)
  return xhr
}