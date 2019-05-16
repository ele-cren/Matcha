import express from 'express'
import { likeUser, dislikeUser } from '../../../utilities/loveManager'

const router = express.Router()

router.put('/like_user', async (req, res) => {
  const userId = req.body.userId
  const userTarget = req.body.userTarget
  const like = await likeUser(userId, userTarget)
  return res.status(200).json(like)
})

router.put('/dislike_user', async (req, res) => {
  const userId = req.body.userId
  const userTarget = req.body.userTarget
  const unlike = await dislikeUser(userId, userTarget)
  return res.status(200).json(unlike)
})

export default router
