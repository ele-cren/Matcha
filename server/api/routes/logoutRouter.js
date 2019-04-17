import express from 'express'

const router = express.Router()

router.delete('/logout', (req, res) => {
  req.session.userId = ''
})

export default router