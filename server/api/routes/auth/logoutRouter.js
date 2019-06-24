import express from 'express'
import { connection } from '../../../app'
import { updateLastDisconnect } from '../../../utilities/updates'

const router = express.Router()

const deleteSessions = (userId) => {
  connection.query("DELETE FROM sessions WHERE user_id = ?", [userId])
  connection.query("UPDATE `users` SET `online` = '0' WHERE `users`.`uuid` = ?", [userId])
}

router.delete('/logout', (req, res) => {
  deleteSessions(req.session.userId)
  updateLastDisconnect(req.session.userId)
  req.session.userId = ''
  return res.json({
    success: true,
    errors: [],
    message: 'You successfully logged out !'
  })
})

export default router