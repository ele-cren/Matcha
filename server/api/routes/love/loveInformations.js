import express from 'express'
import { meAboutUser, userAboutMe } from '../../../utilities/loveManager'

const router = express.Router()

router.get('/:userId', async (req, res) => {
  const myInfos = await meAboutUser(req.session.userId, req.params.userId)
  const userInfos = await userAboutMe(req.session.userId, req.params.userId)
  res.status(200).json({
    userSawMe: userInfos.length > 0 && userInfos[0].view,
    iLoveUser: myInfos.length > 0 && myInfos[0].like,
    userLovesMe: userInfos.length > 0 && userInfos[0].like,
    match: (myInfos.length > 0 && userInfos.length > 0 && myInfos[0].like && userInfos[0].like)
  })
})

export default router
