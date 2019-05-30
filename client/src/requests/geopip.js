export const getCoordsFromIp = (ip) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://extreme-ip-lookup.com/json/' + ip)
  xhr.responseType = 'json'
  xhr.send()
  return xhr   
}