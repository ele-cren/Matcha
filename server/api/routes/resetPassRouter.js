import express from 'express'
import { getUserFromEmail, getUserFromUsername } from '../../utilities/checkLogin'
import { mailer, connection } from '../../app'
import generator from 'generate-password'
import bcrypt from 'bcrypt'
require('@babel/polyfill')

const router = express.Router()

const updatePassword = (uuid, password) => {
  const saltRounds = 8
  bcrypt.hash(password, saltRounds, (err, hash) => {
    connection.query("UPDATE `users` SET `password` = " + `'${hash}'` + " WHERE `users`.`uuid` = " + `'${uuid}'`)
  })
}

router.post('/reset_pass', async (req, res) => {
  const user = await getUserFromEmail(req.body.login)
  if (!user) {
    user = await getUserFromUsername(req.body.login)
  }
  if (!user) {
    return res.json({
      success: false,
      errors: { login: 'This user does not exist' },
      message: 'Reset failed'
    })
  }
  const email = user[0].email
  const newPass = generator.generate({
    length: 20,
    numbers: true
  })
  updatePassword(user[0].uuid, newPass)
  mailer.sendPassword(email, newPass)
  return res.json({
    success: true,
    message: 'The password has been successfuly sent',
    errors: {}
  })
})

export default router