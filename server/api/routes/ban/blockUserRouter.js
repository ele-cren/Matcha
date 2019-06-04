import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const blockUser = (userId, blockedUser) => {
  connection.query("INSERT INTO `blocked` (`id`, `user_id`, `blocked_user`) VALUES (NULL, ?, ?)", [userId, blockedUser])
}

const removeBlocked = (userId, blockedUser) => {
  connection.query("DELETE FROM `blocked` WHERE `blocked`.`user_id` = ? AND `blocked`.`blocked_user` = ?", [userId, blockedUser])
}

const getBlocked = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM blocked WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

router.post('/block', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not authorized')
  }
  const blockedUser = req.body.blockedUser
  blockUser(req.session.userId, blockedUser)
  return res.status(200).send('User blocked !')
})

router.get('/block', async (req, res) => {
  const userId = req.session.userId
  if (!userId) {
    return res.status(401).send('Not authorized')
  }
  const blockedUsers = await getBlocked(userId)
  return res.status(200).json({
    blockedUsers: blockedUsers
  })
})

router.delete('/block', (req, res) => {
  const userId = req.session.userId
  const blockedUser = req.body.blockedUser
  if (!userId) {
    return res.status(400).send('Not authorized')
  }
  removeBlocked(userId, blockedUser)
  return res.status(200).send('User blocked removed !')
})

export default router
