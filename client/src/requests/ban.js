export const blockUser = (blockedUser) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/api/ban/block')
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const encodedBlocked = encodeURIComponent(blockedUser)
  const data = `blockedUser=${ encodedBlocked }`
  xhr.send(data)
}

export const removeBlockedUser = (blockedUser) => {
  const xhr = new XMLHttpRequest()
  xhr.open('DELETE', '/api/ban/block')
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const encodedBlocked = encodeURIComponent(blockedUser)
  const data = `blockedUser=${ encodedBlocked }`
  xhr.send(data)
}

export const reportUser = (reportedUser) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/api/ban/report')
  xhr.responseType = 'json'
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  const encodedReported = encodeURIComponent(reportedUser)
  const data = `reportedUser=${ encodedReported }`
  xhr.send(data)
}