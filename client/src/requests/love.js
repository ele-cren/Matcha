export const likeUser = (userId, userTarget) => {
  userId = encodeURIComponent(userId)
  userTarget = encodeURIComponent(userTarget)
  const data = `userId=${ userId }&userTarget=${ userTarget }`
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', '/api/love/like_user')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.responseType = 'json'
  xhr.send(data)
  return xhr
}

export const unlikeUser = (userId, userTarget) => {
  userId = encodeURIComponent(userId)
  userTarget = encodeURIComponent(userTarget)
  const data = `userId=${ userId }&userTarget=${ userTarget }`
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', '/api/love/unlike_user')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.responseType = 'json'
  xhr.send(data)
  return xhr
}

export const getLoveInfos = (userTarget) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/love/' + userTarget)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}