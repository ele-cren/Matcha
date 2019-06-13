export const getProfiles = (data, offset) => {
  const genderEncoded = encodeURIComponent(data.gender)
  const offsetEncoded = encodeURIComponent(offset)
  const typeEncoded = encodeURIComponent(data.type)
  const dataSend = `type=${ typeEncoded }&gender=${ genderEncoded }&offset=${ offsetEncoded }`
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profiles?' + dataSend)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}