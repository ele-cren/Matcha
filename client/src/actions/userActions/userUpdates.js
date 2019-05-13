export const updateLastActive = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/api/user/update_active')
  xhr.send()
}