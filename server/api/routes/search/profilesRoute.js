import express from 'express'
import { getProfileInfos } from '../../../utilities/userInfos'
import { connection } from '../../../app'
import mysql from 'mysql'

const router = express.Router()

const getUsersWithGender = (gender, offset) => {
  return new Promise((resolve, reject) => {
    const limit = `${ offset },10`
    connection.query('SELECT user_id FROM informations WHERE gender=? LIMIT ' + limit, [gender], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getUsers = (offset) => {
  return new Promise((resolve, reject) => {
    const limit = `${ offset },10`
    connection.query("SELECT user_id FROM informations LIMIT " + limit, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

router.get('/', async (req, res) => {
  const gender = req.query.gender
  const offset = req.query.offset
  let users
  if (gender != -1) {
    users = await getUsersWithGender(gender, offset)
  } else {
    users = await getUsers(offset)
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
