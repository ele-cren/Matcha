import express from 'express'
import { connection, mailer } from '../../../app'
import bcrypt from 'bcrypt'
import { registerValidation } from '../../../utilities/verifications'
import uuidv4 from 'uuid/v4'
require('@babel/polyfill') //Required to handle async

const router = express.Router()

const isEmailTaken = email => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id FROM `users` WHERE email = ?", [email], (err, results) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(true)
      }
      resolve(false)
    })
  })
}

const isUserTaken = username => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id FROM `users` WHERE username = ?", [username] , (err, results) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(true)
      }
      resolve(false)
    })
  })
}

router.post('/register', async (req, res) => {
  const validation = registerValidation(req.body)

  if (!validation.success){
    return res.json(validation)
  }
  const emailExists = await isEmailTaken(req.body.email)
  const userExists = await isUserTaken(req.body.username)

  if (emailExists || userExists) {
    return res.json({
      success: false,
      errors: emailExists && userExists ? [7, 8] : emailExists ? [8] : [7]
    })
  }
  const uuid = uuidv4()
  const saltRounds = 8
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      return res.send('Error ' + err)
    }
    connection.query("INSERT INTO `users` (`id`, `confirmed`, `username`, `email`, `password`, `first_name`, `last_name`, `uuid`)\
                      VALUES (NULL, '0', ?, ?, ?, ?, ?, ?)",
                      [req.body.username, req.body.email, hash, req.body.first_name, req.body.last_name, uuid], async (err) => {
      if (err) {
        return res.send('Error ' + err)
      }
      mailer.sendConfirmation(req.body.email, uuid)
      return res.json({
        success: true,
        errors: []
      })
    })
  });
})

export default router
