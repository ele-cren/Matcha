import express from 'express'
import { getUsersAboutMeInfos, getMeAboutUsersInfos } from '../../../utilities/loveManager'

const router = express.Router()

router.get('/infos/:userId', async (req, res) => {
  const usersAboutMe = await getUsersAboutMeInfos(req.params.userId)
  const meAboutUsers = await getMeAboutUsersInfos(req.params.userId)
  return res.status(200).json({
    meAboutUsers: meAboutUsers,
    usersAboutMe: usersAboutMe
  })
})

export default router
