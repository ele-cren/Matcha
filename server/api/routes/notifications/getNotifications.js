import express from 'express'
import { connection } from '../../../app'
import { getLoveUserInfos } from '../../../utilities/userInfos'

const router = express.Router()

const getNotifications = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `notifications` WHERE user_id=?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

router.get('/', async (req, res) => {
  const userId = req.session.userId
  if (!userId) {
    return res.status(204).send('Please provide userId')
  }
  const notifications = await getNotifications(userId)
  let newNotifications = []
  for (const notif of notifications) {
    const userInfos = await getLoveUserInfos(notif.from_user)
    newNotifications = [
      ...newNotifications,
      {
        uuid: notif.uuid,
        user_id: notif.user_id,
        from_user: notif.from_user,
        type: notif.type,
        view: notif.view,
        userInfos: userInfos
      }
    ]
  }
  return res.status(200).json({ notifications: newNotifications })
})

export default router
