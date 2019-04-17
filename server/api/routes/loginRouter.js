import express from 'express'
import { loginValidation } from '../../utilities/verifications'
import bcrypt from 'bcrypt'
require('@babel/polyfill') //Required to handle async
import { getUserFromEmail, getUserFromUsername } from '../../utilities/checkLogin'
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
  return bcrypt.compare(req.body.password, user[0].password, (err, isPasswordValid) => {
    if (err) {
      return res.send('Error ' + err)
    }
    if (isPasswordValid) {
      req.session.userId = user[0].uuid
      return res.json({
        success: true,
        message: 'You successfully logged in !',
        errors: {},
        user: user[0].uuid
      })
    }
    return res.json({
      succes: false,
      errors: { password: 'Wrong password, please try again or reset your password' },
      message: 'Login failed',
    })
  })
})

export default router