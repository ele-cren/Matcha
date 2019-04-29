import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const checkUser = uniqid => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, confirmed FROM `users` WHERE uuid=" + `'${uniqid}'`, (err, results) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(results[0])
      }
      resolve(null)
    })
  })
}

router.get('/confirmation/:uniqid', async (req, res) => {
  const userId = await checkUser(req.params.uniqid)
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User not confirmed',
      errors: { user: 'This user does not exist' }
    })
  }
  if (userId.confirmed) {
    return res.status(400).json({
      success: false,
      message: 'User not confirmed',
      errors: { user: 'This user has already been confirmed' }
    })
  }
  connection.query("UPDATE `users` SET `confirmed`='1' WHERE id=" + `'${userId.id}'`, (err) => {
    if (err) {
      return res.status(400).send('Error ' + err)
    }
    return res.status(200).json({
      success: true,
      message: 'User successfully confirmed !',
      errors: {}
    })
  })
})

export default router