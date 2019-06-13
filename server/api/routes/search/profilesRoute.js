import express from 'express'
import { getProfileInfos } from '../../../utilities/userInfos'
import { connection } from '../../../app'

const router = express.Router()

const getUsers = (gender, offset) => {
  let genderSql = gender != -1 ? 'gender = ?' : 'gender = ? OR gender = ?'
  let genderArray = gender != -1 ? [gender] : [1, 2]
  return new Promise((resolve, reject) => {
    const limit = `${ offset },10`
    connection.query(`SELECT user_id FROM informations WHERE ${ genderSql } LIMIT ${ limit }`, genderArray, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const searchUsers = (data) => {
  let genderSql = data.gender !== '-1' ? 'informations.gender = ?' : '(informations.gender = ? OR informations.gender = ?)'
  let genderArray = data.gender !== '-1' ? [data.gender] : ['1', '2']
  const array = genderArray.concat([data.minAge, data.maxAge, data.minScore, data.maxScore, data.online])
  return new Promise((resolve, reject) => {
    const limit = `${ data.offset },10`
    connection.query(`SELECT informations.user_id FROM informations INNER JOIN users ON informations.user_id = users.uuid\
                      WHERE ${ genderSql } AND informations.age >= ? AND informations.age <= ? AND informations.score >= ?\
                      AND informations.score <= ? AND users.online = ? LIMIT ${ limit }`, array, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }       
    })
  })
}

router.get('/', async (req, res) => {
  const type = req.query.type
  const gender = req.query.gender
  const offset = req.query.offset
  let users = []
  if (type === 'suggests') {
    users = await getUsers(gender, offset)
  } else if (type === 'search') {
    const data = {
      gender: gender,
      offset: offset,
      minAge: req.query.minAge,
      maxAge: req.query.maxAge,
      minScore: req.query.minScore,
      maxScore: req.query.maxScore,
      online: req.query.online
    }
    users = await searchUsers(data)
  }
  let profiles = []
  for (const user of users) {
    if (user.user_id !== req.session.userId) {
      const infos = await getProfileInfos(user.user_id)
      profiles = [...profiles, infos]
    }
  }
  return res.status(200).json({
    userProfiles: profiles
  })
})

export default router
