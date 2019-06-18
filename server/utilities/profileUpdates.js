import { connection } from '../app'

export const getInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM informations WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const updateInformations = (infos) => {
  const arrayInfos = [
    infos.age,
    infos.gender,
    infos.orientation,
    infos.bio,
    infos.score,
    infos.latitude,
    infos.longitude,
    infos.user_id
  ]
  connection.query("UPDATE `informations` SET `age` = ?, `gender` = ?, `orientation` = ?, `bio` = ?, `score` = ?, `latitude` = ?,\
                    `longitude` = ? WHERE `informations`.`user_id` = ?", arrayInfos)
}

export const createInformations = (infos, userId) => {
  const arrayInfos = [
    userId,
    infos.age,
    infos.gender,
    infos.orientation ? infos.orientation : '2',
    infos.bio,
    infos.score ? infos.score : '0',
    infos.latitude,
    infos.longitude,
    infos.user_id
  ]
  connection.query("INSERT INTO `informations` (`id`, `user_id`, `age`, `gender`, `orientation`, `bio`, `score`, `latitude`, `longitude`)\
                    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)", arrayInfos)
}

export const getPictures = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM pictures WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const updatePicture = (userId, lastUrl, newUrl) => {
  connection.query('UPDATE pictures SET url = ? WHERE user_id = ? AND url = ?', [newUrl, userId, lastUrl])
}

export const createPicture = (userId, newUrl, main) => {
  connection.query("INSERT INTO `pictures` (`id`, `user_id`, `url`, `main`) VALUES (NULL, ?, ?, ?)", [userId, newUrl, main])
}