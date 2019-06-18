import express from 'express'
import { updateInformations, getInformations, createInformations,
        getPictures, updatePicture, createPicture, updateMainInformations } from '../../../utilities/profileUpdates'

const router = express.Router()

router.put('/informations', async (req, res) => {
  const informations = JSON.parse(req.body.informations)
  const profileInfos = await getInformations(req.session.userId)
  if (profileInfos.length === 0) {
    createInformations(informations, req.session.userId)
  } else {
    updateInformations(informations)
  }
  return res.status(200).send('Informations updated')
})

router.put('/mainInformations', (req, res) => {
  const mainInformations = JSON.parse(req.body.mainInformations)
  updateMainInformations(mainInformations, req.session.userId)
  return res.status(200).send('Main Informations updated')
})

router.put('/pictures', async (req, res) => {
  const newUrl = req.body.newUrl
  const lastUrl = req.body.lastUrl
  const userId = req.session.userId
  const pictures = await getPictures(userId)
  if (lastUrl) {
    updatePicture(userId, lastUrl, newUrl)
  } else {
    createPicture(userId, newUrl, pictures.length === 0 ? 1 : 0)
  }
  return res.status(200).send('Pictures Updated')
})

export default router