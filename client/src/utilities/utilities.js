export const isObjectEmpty = (object) => {
  return Object.getOwnPropertyNames(object).length === 0
}