export const getProfiles = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profiles')
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}