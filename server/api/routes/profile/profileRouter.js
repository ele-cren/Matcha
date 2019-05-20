import express from 'express'
import { getProfileInfos } from '../../../utilities/userInfos'

const router = express.Router()

router.get('/:userId', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not Authorized')
  }
  const userId = req.params.userId
  const profileInfos = await getProfileInfos(userId)
  return res.status(200).json(profileInfos)
})

export default router