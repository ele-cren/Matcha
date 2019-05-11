var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var tags = require('../tags/tags')

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const getRandomTag = () => {
  const tagNumber = getRandomArbitrary(0, tags.length)
  return tags[tagNumber]
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://randomuser.me/api/?results=10&nat=fr')
    xhr.send()
    xhr.onload = () => {
      const json = JSON.parse(xhr.responseText)
      if (json.error) { 
        reject(json.error)
      } else {
        resolve(json.results)
      }
    }
  })
}

const createUser = (knex, user, pass) => {
  return knex('users').insert({
    username: user.login.username,
    email: user.email,
    password: pass,
    confirmed: true,
    first_name: capitalize(user.name.first),
    last_name: capitalize(user.name.last),
    uuid: user.login.uuid,
    pass_changed: false
  })
}

const createInformations = (knex, user) => {
  const gender = user.gender === 'male' ? 1 : 2
  let orientation = getRandomArbitrary(1, 5)
  while ((gender === 1 && orientation === 3) || (gender === 2 && orientation === 4)) {
    orientation = getRandomArbitrary(1, 5)
  }
  return knex('informations').insert({
    user_id: user.login.uuid,
    gender: gender,
    orientation: orientation,
    bio: 'Hello my name is ' + capitalize(user.name.first) +
          ' and I am from ' + capitalize(user.location.city) +
          '. I want to meet some people to be friends with :)',
    score: 0,
    longitude: user.location.coordinates.longitude,
    latitude: user.location.coordinates.latitude
  })
}

const createPicture = (knex, user) => {
  return knex('pictures').insert({
    user_id: user.login.uuid,
    url: user.picture.large,
    main: true
  })
}

const createTag = (knex, user, tag) => {
  return knex('tags').insert({
    user_id: user.login.uuid,
    tag: tag
  })
} 

exports.seed = async (knex, Promise) => {
      let records = [];
      const pass = '$2a$08$7X3xOmqJND5AIsm/HvskVuPp5B4g8bSkEfQm0emMu9KbXVp1mTJeG'
      const userProfile = await getUserProfile()
      userProfile.forEach((user) => {
        records.push(createUser(knex, user, pass))
        records.push(createInformations(knex, user))
        records.push(createPicture(knex, user))
        for (let i = 0; i < 5; i++) {
          const tag = getRandomTag()
          records.push(createTag(knex, user, tag))
        }
      }) 

      return Promise.all(records);
};