export const getProfiles = (gender, offset) => {
  const genderEncoded = encodeURIComponent(gender)
  const offsetEncoded = encodeURIComponent(offset)
  const data = `gender=${ genderEncoded }&offset=${ offsetEncoded }`
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profiles?' + data)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}