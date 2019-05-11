export const isObjectEmpty = (object) => {
  return Object.getOwnPropertyNames(object).length === 0
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}