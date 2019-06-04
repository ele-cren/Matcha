import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const updateInformation = (infos) => {
  const arrayInfos = [
    infos.age,
    infos.gender,
    infos.orientation,
    infos.bio,
    infos.score,
    infos.latitude,
    infos.longitude,
    infos.user_id
  ]
  connection.query("UPDATE `informations` SET `age` = ?, `gender` = ?, `orientation` = ?, `bio` = ?, `score` = ?, `latitude` = ?,\
                    `longitude` = ? WHERE `informations`.`user_id` = ?", arrayInfos)
}

router.put('/informations', (req, res) => {
  const informations = JSON.parse(req.body.informations)
  updateInformation(informations)
  return res.status(200).send('Informations updated')
})

export default router