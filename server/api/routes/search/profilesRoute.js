import express from 'express'
import { getProfileInfos } from '../../../utilities/userInfos'
import { connection } from '../../../app'

const router = express.Router()

const getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT uuid FROM users", (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

router.get('/', async (req, res) => {
  const users = await getUsers()
  let profiles = []
  for (const user of users) {
    if (user.uuid !== req.session.userId) {
      const infos = await getProfileInfos(user.uuid)
      profiles = [...profiles, infos]
    }
  }
  return res.status(200).json({
    userProfiles: profiles
  })
})

export default router
