import express from 'express'
import { doILoveUser, doesUserLoveMe } from '../../../utilities/loveManager'

const router = express.Router()

router.get('/:userId', async (req, res) => {
  const iLoveUser = await doILoveUser(req.session.userId, req.params.userId)
  const userLovesMe = await doesUserLoveMe(req.session.userId, req.params.userId)
  res.status(200).json({
    iLoveUser: iLoveUser,
    userLovesMe: userLovesMe,
    match: (iLoveUser && userLovesMe)
  })
})

export default router
