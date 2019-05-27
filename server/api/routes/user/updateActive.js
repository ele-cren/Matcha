import express from 'express'
import { updateLastActive } from '../../../utilities/updates'

const router = express.Router()

router.get('/update_active', (req, res) => {
  if (req.session.userId) {
    updateLastActive(req.session.userId)
  }
  res.status(200).send('Updated')
})

export default router
