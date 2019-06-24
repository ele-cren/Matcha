import express from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()

router.post('/upload', (req, res) => {
  const folder = path.join(__dirname, '../../../uploads/images')
  const base64Data = req.body.image.split(';base64,').pop()
  const fileName = `${ Date.now() }.png`
  const filePath = `${ folder }/${ fileName }`
  fs.writeFile(filePath, base64Data, { encoding: 'base64' }, (err) => {
    if (err) {
      return res.status(400).send('Could not upload the picture')
    }
    return res.status(200).send(fileName)
  })
})

export default router
