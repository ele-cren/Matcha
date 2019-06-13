export const getProfiles = (data, offset) => {
  const genderEncoded = encodeURIComponent(data.gender)
  const offsetEncoded = encodeURIComponent(offset)
  const typeEncoded = encodeURIComponent(data.type)
  const minAge = data.age ? encodeURIComponent(data.age[0]) : ''
  const maxAge = data.age ? encodeURIComponent(data.age[1]) : ''
  const minScore = data.score ? encodeURIComponent(data.score[0]) : ''
  const maxScore = data.score ? encodeURIComponent(data.score[1]) : ''
  const online = encodeURIComponent(data.online)
  const dataSend = `type=${ typeEncoded }&gender=${ genderEncoded }&offset=${ offsetEncoded }&minAge=${ minAge }&maxAge=${ maxAge }\
                    &minScore=${ minScore }&maxScore=${ maxScore }&online=${ online }`
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/profiles?' + dataSend)
  xhr.responseType = 'json'
  xhr.send()
  return xhr
}