import express from 'express'
import publicIp from 'public-ip'
import bcrypt from 'bcrypt'
require('@babel/polyfill') //Required to handle async
import { loginValidation } from '../../../utilities/verifications'
import { getUserFromEmail, getUserFromUsername } from '../../../utilities/checkLogin'
import { connection } from '../../../app'
import { updatePassChanged } from '../../../utilities/passChanged'
import { updateIp } from '../../../utilities/updates'

const router = express.Router()

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
      errors: { login: 'This user does not exist' },
      message: 'Login failed'
    })
  }
  if (!user[0].confirmed) {
    return res.json({
      success: false,
      errors: { login: 'This user has not been confirmed yet' },
      message: 'Login failed'
    })
  }
  return bcrypt.compare(req.body.password, user[0].password, async (err, isPasswordValid) => {
    if (err) {
      return res.send('Error ' + err)
    }
    if (isPasswordValid) {
      req.session.userId = user[0].uuid
      updatePassChanged(user[0].uuid, '0')
      const remoteIp = await publicIp.v4()
      updateIp(user[0].uuid, remoteIp)
      return res.json({
        success: true,
        message: 'You successfully logged in !',
        errors: {},
        user: {
          userId: user[0].uuid,
          ip: user[0].ip
        }
      })
    }
    return res.json({
      succes: false,
      errors: { password: 'Wrong password, please try again or reset your password' },
      message: 'Login failed',
    })
  })
})

router.get('/logged', (req, res) => {
    return connection.query("SELECT pass_changed, ip FROM users WHERE uuid=?", [req.session.userId], async (err, results) => {
      if (err) {
        return res.status(400).send('Error ' + err)
      }
      if (!results || results.length === 0 || results[0].pass_changed) {
        req.session.userId = ''
        return res.status(401).send('Not authorized')
      }
      const remoteIp = await publicIp.v4()
      updateIp(req.session.userId, remoteIp)
      return res.status(200).json({
        userId: req.session.userId,
        ip: results[0].ip
      })
    })
})

export default router