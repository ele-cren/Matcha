export const uploadFile = (file) => {
  const xhr = new XMLHttpRequest()
  const dataForm = new FormData()
  dataForm.append('picture', file)
  xhr.open('POST', '/api/upload')
  xhr.send(dataForm)
  return xhr
}