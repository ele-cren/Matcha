import express from 'express'

const router = express.Router()

router.post('/upload', (req, res) => {
  res.send('hello')
})

export default router
