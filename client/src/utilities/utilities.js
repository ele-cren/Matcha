export const isObjectEmpty = (object) => {
  return Object.getOwnPropertyNames(object).length === 0
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getGender = (genderNum, text) => {
  switch (genderNum) {
    case 1:
      return [text["gender_male"], '#7986cb']
    case 2:
      return [text["gender_female"], '#ad1457']
    default:
      return [text["gender_male"], '#7986cb']
  }
}

export const getOrientation = (orientationNum, text) => {
  switch (orientationNum) {
    case 1:
      return [text["orientation_straight"], '#8c7e7a']
    case 2:
      return [text["orientation_bisexual"], '#583166']
    case 3:
      return [text["orientation_lesbian"], '#ad1457']
    case 4:
      return [text["orientation_gay"], '#7986cb']
    default:
      return [text["orientation_bisexual"], '#a19ee9']
  }
}

export const getLastDisconnectDate = (utcDateString) => {
  const utcDate = (new Date(utcDateString))
  const hours = new Date().getTimezoneOffset() / 60
  utcDate.setTime(utcDate.getTime() - (hours * 60 * 60 * 1000))
  return utcDate
}

export const getLastDisconnect = (date, text) => {
  const diff = new Date() - date
  let name = ''
  let number = 0
  const times = [1000, 60000, 3600000, 86400000]
  const names = [text["second"], text["minute"], text["hour"], text["day"]]
  for (let i = 1; i < times.length; i++) {
    if (diff < times[i]) {
      name = names[i - 1]
      break
    }
  }
  name = name ? name : text["day"]
  for (let i = 0; i < names.length; i++) {
    if (name === names[i]) {
      number = diff / times[i]
      break
    }
  }
  number = parseInt(number)
  return number + ' ' + name + (number > 1 ? 's' : '')
}