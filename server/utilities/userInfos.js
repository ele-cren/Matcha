import { connection } from '../app'

const getUserInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM informations WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getMainInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT first_name, last_name, email, online FROM users WHERE uuid=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getPictures = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT url, main FROM pictures WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getTags = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT tag FROM tags WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

export const getProfileInfos = async (userId) => {
  const mainInfos = await getMainInformations(userId)
  const informations = await getUserInformations(userId)
  const pictures = await getPictures(userId)
  const tags = await getTags(userId)
  return {
    mainInformations: mainInfos[0],
    informations: informations[0],
    pictures: pictures,
    tags: tags
  }
}

export const getLoveUserInfos = async (userId) => {
  const mainInfos = await getMainInformations(userId)
  const informations = await getUserInformations(userId)
  const pictures = await getPictures(userId)
  let mainPicture = ''
  pictures.map(x => {
    if (x.main) {
      mainPicture = x.url
    }
  })
  return {
    mainInformations: mainInfos[0],
    informations: informations[0],
    mainPicture: mainPicture
  }
}