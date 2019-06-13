import express from 'express'
import { getProfileInfos } from '../../../utilities/userInfos'
import { connection } from '../../../app'
import mysql from 'mysql'

const router = express.Router()

const getUsers = (gender, offset) => {
  console.log(gender)
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

router.get('/', async (req, res) => {
  const type = req.query.type
  const gender = req.query.gender
  const offset = req.query.offset
  let users = []
  if (type === 'suggests') {
    users = await getUsers(gender, offset)
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
