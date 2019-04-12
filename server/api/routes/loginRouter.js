import express from 'express'
import { loginValidation } from '../../utilities/verifications'
import { connection } from '../../app'
import bcrypt from 'bcrypt'
require('@babel/polyfill') //Required to handle async

const router = express.Router()

const getUserFromUsername = username => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM `users` WHERE username=" + `'${username}'`, (err, results, field) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(results)
      }
      resolve(null)
    })
  })
}

const getUserFromEmail = email => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM `users` WHERE email=" + `'${email}'`, (err, results, field) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(results)
      }
      resolve(null)
    })
  })
}


router.post('/login', async (req, res) => {
  const validation = loginValidation(req.body)
  if (!validation.success) {
    return res.json(validation)
  }
  let user = await getUserFromUsername(req.body.login)
  if (!user) {
    user = await getUserFromEmail(req.body.login)
  }
  if (!user) {
    return res.json({
      success: false,
      errros: { login: 'This user does not exist' },
      message: 'Login failed'
    })
  }
  return bcrypt.compare(req.body.password, user[0].password, (err, isPasswordValid) => {
    if (err) {
      return res.send('Error ' + err)
    }
    if (isPasswordValid) {
      return res.json({
        success: true,
        message: 'You successfuly logged in !'
      })
    }
    return res.json({
      succes: false,
      errors: { password: 'Wrong password, please try again or reset your password' },
      message: 'Login failed'
    })
  })
})

export default router