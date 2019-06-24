export const uploadFile = (imageBase64) => {
  const xhr = new XMLHttpRequest()
  const data = `image=${ encodeURIComponent(imageBase64) }`
  xhr.open('POST', '/api/upload')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(data)
  return xhr
}