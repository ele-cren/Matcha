export const isObjectEmpty = (object) => {
  return Object.getOwnPropertyNames(object).length === 0
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getGender = (genderNum) => {
  switch (genderNum) {
    case 1:
      return ['Male', '#7986cb']
    case 2:
      return ['Female', '#ad1457']
    default:
      return ['Male', '#7986cb']
  }
}

export const getOrientation = (orientationNum) => {
  switch (orientationNum) {
    case 1:
      return ['Straight', '#8c7e7a']
    case 2:
      return ['Bisexual', '#583166']
    case 3:
      return ['Lesbian', '#ad1457']
    case 4:
      return ['Gay', '#7986cb']
    default:
      return ['Bisexual', '#a19ee9']
  }
}