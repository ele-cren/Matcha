import express from 'express'
import { deleteSession } from '../../../utilities/sessionsManager'
import ip from 'ip'

const router = express.Router()

router.delete('/logout', (req, res) => {
  const localIp = ip.address()
  deleteSession(req.session.userId, localIp)
  req.session.userId = ''
  return res.json({
    success: true,
    errors: {},
    message: 'You successfully logged out !'
  })
})

export default router