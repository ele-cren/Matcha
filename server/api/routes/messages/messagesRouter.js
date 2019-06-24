import express from 'express'
import { getMessagesIReceived, getMessagesISent } from '../../../utilities/messages'

const router = express.Router()

router.get('/messages', async (req, res) => {
  const userId = req.session.userId
  if (!userId) {
    return res.status(401).send('Not authorized')
  }
  const messagesISent = await getMessagesISent(userId)
  const messagesIReceived = await getMessagesIReceived(userId)
  return res.status(200).json({
    messagesISent: messagesISent,
    messagesIReceived: messagesIReceived
  })
})

export default router
