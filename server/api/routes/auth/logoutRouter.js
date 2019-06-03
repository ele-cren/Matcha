import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const deleteSessions = (userId) => {
  connection.query("DELETE FROM sessions WHERE user_id = ?", [userId])
}

router.delete('/logout', (req, res) => {
  deleteSessions(req.session.userId)
  req.session.userId = ''
  return res.json({
    success: true,
    errors: [],
    message: 'You successfully logged out !'
  })
})

export default router