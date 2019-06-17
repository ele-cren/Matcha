import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const getInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM informations WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

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

const createInformations = (infos, userId) => {
  const arrayInfos = [
    userId,
    infos.age,
    infos.gender,
    infos.orientation ? infos.orientation : '2',
    infos.bio,
    infos.score ? infos.score : '0',
    infos.latitude,
    infos.longitude,
    infos.user_id
  ]
  connection.query("INSERT INTO `informations` (`id`, `user_id`, `age`, `gender`, `orientation`, `bio`, `score`, `latitude`, `longitude`)\
                    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)", arrayInfos)
}

router.put('/informations', async (req, res) => {
  const informations = JSON.parse(req.body.informations)
  const profileInfos = await getInformations(req.session.userId)
  if (profileInfos.length === 0) {
    createInformations(informations, req.session.userId)
  } else {
    updateInformation(informations)
  }
  return res.status(200).send('Informations updated')
})

// router.put('/pictures', (req, res) => {
//   const picUrl = req.body.url
//   const main = req.body.main
// })

export default router