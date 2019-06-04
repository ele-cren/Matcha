import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const reportUser = (userId, reportedUser) => {
  connection.query("INSERT INTO `reported` (`id`, `user_id`, `reported_user`) VALUES (NULL, ?, ?)", [userId, reportedUser])
}

const getReported = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM reported WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

router.post('/report', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not authorized')
  }
  const reportedUser = req.body.reportedUser
  reportUser(req.session.userId, reportedUser)
  return res.status(200).send('User reported !')
})

router.get('/report', async (req, res) => {
  const userId = req.session.userId
  if (!userId) {
    return res.status(401).send('Not authorized')
  }
  const reportedUsers = await getReported(userId)
  return res.status(200).json({
    reportedUsers: reportedUsers
  })
})

export default router
