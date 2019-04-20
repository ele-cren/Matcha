import express from 'express'

const router = express.Router()

router.delete('/logout', (req, res) => {
  req.session.userId = ''
  return res.json({
    success: true,
    errors: {},
    message: 'You successfully logged out !'
  })
})

export default router