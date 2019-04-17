import express from 'express'
import { connection } from '../../app'

const router = express.Router()

const checkUser = uniqid => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id FROM `users` WHERE uuid=" + `'${uniqid}'`, (err, results, field) => {
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
    return res.json({
      success: false,
      message: 'This user does not exist',
      errors: {}
    })
  }
  connection.query("UPDATE `users` SET `confirmed`='1' WHERE id=" + `'${userId.id}'`, (err, results, field) => {
    if (err) {
      return res.send('Error ' + err)
    }
    return res.json({
      success: true,
      message: 'User successfully confirmed !',
      errors: {}
    })
  })
})

export default router