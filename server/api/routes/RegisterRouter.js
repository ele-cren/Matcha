import express from 'express'
import { connection, mailer } from '../../app'
import bcrypt from 'bcrypt'
import uniqid from 'uniqid'
require('@babel/polyfill')

const router = express.Router()

const registerValidation = (payload) => {
  let errors = {}
  const emailRegex = /(^[A-z0-9]+)(([._\-A-z0-9]+))@[\-A-z0-9]+?\.([\-A-z0-9]+\.)?[a-z]+$/
  const passRegex = /^\S{8,20}$/
  const userRegex = /^(?=.{5,20}$)(?!.*[_.\-]{2})[a-zA-Z0-9._\-]+$/
  let isValid = true

  if (!payload.email || !emailRegex.test(payload.email) || payload.email.startsWith('_')) {
    errors.email = 'Please, provide a valid email address'
    isValid = false
  }
  if (!payload.username || !userRegex.test(payload.username)) {
    errors.username = 'Please, provide a valid username. 5 - 20 characters, [._-] digits and letters'
    isValid = false
  }
  if (!payload.password || !passRegex.test(payload.password)) {
    errors.password = 'Please, provide a password between 8 and 20 characters'
    isValid = false
  }
  if (!payload.first_name) {
    errors.first_name = 'Please, provide your first name'
    isValid = false
  }
  if (!payload.last_name) {
    errors.last_name = 'Please, provide your last name'
    isValid = false
  }

  return {
    success: isValid,
    message: isValid ? '' : 'The form contains some errors. Please fix it',
    errors: errors
  }
}

const isEmailTaken = email => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id FROM `users` WHERE email='" + email + "'", (err, results, field) => {
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
    connection.query("SELECT id FROM `users` WHERE username='" + username + "'", (err, results, field) => {
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
      message: 'The form contains some errors. Plese fix it',
      errors: { email: emailExists ? 'This email already exists.' : '', username: userExists ? 'This username already exists' : '' }
    })
  }
  const myUniqId = uniqid()
  const saltRounds = 8
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      return res.send('Error ' + err)
    }
    connection.query("INSERT INTO `users` (`id`, `confirmed`, `username`, `email`, `password`, `first_name`, `last_name`, `uniqid`) VALUES " + `(NULL, '0', '${req.body.username}', '${req.body.email}',\
      '${hash}', '${req.body.first_name}', '${req.body.last_name}', '${myUniqId}');`, async (err, results, field) => {
        if (err) {
          return res.send('Error ' + err)
        }
        mailer.sendConfirmation(req.body.email, myUniqId)
        return res.json({
          success: true,
          message: 'Successfuly registered ! Please, confirm your email address'
        })
    })
  });
})

export default router