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
      return [text["gender_male"], '#406087']
    case 2:
      return [text["gender_female"], '#7c4a68']
    default:
      return [text["gender_male"], '#406087']
  }
}

export const getOrientation = (orientationNum, text) => {
  switch (orientationNum) {
    case 1:
      return [text["orientation_straight"], '#aa4949']
    case 2:
      return [text["orientation_bisexual"], '#537c42']
    case 3:
      return [text["orientation_lesbian"], '#7c4a68']
    case 4:
      return [text["orientation_gay"], '#406087']
    default:
      return [text["orientation_bisexual"], '#537c42']
  }
}

export const getLocaleDate = (utcDateString) => {
  const utcDate = (new Date(utcDateString))
  const hours = new Date().getTimezoneOffset() / 60
  utcDate.setTime(utcDate.getTime() - (hours * 60 * 60 * 1000))
  return utcDate
}

export const getUtcDate = () => {
  const date = new Date()
  const year = date.getUTCFullYear()
  let month = date.getUTCMonth() + 1
  let day = date.getUTCDate()
  let hours = date.getUTCHours()
  let min = date.getUTCMinutes()
  let sec = date.getUTCSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hours = hours < 10 ? '0' + hours : hours
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  const utcDate = `${ year }-${ month }-${ day } ${ hours }:${ min }:${ sec }`
  return utcDate
}

export const formatDate = (date, language) => {
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  day = day < 10 ? '0' + day : day
  month = month < 10 ? '0' + month : month
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  switch (language) {
    case 'FR':
      return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
    case 'EN':
      return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
    default:
      return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds
  }
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

export const getGenderFromOriGend = (gender, orientation) => {
  if (orientation === 2) {
    return -1
  }
  if (gender === 1) {
    return orientation === 1 ? 2 : 4
  } else {
    return orientation === 1 ? 1 : 3
  }
}

export const capitalizeString = (str) => {
  if (!str) {
    return ''
  }
  const split = str.split(' ')
  let finalString = ''
  split.forEach(x => {
    const newString = x.charAt(0).toUpperCase() + x.slice(1)
    finalString = finalString ? finalString + ' ' + newString : newString
  })
  return finalString
}