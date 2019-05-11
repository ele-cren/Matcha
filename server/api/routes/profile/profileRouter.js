import express from 'express'
import { connection } from '../../../app'

const router = express.Router()

const getUserInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT gender, bio, orientation FROM informations WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getMainInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT first_name, last_name, email FROM users WHERE uuid=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getPictures = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT url, main FROM pictures WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

const getTags = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT tag FROM tags WHERE user_id=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not Authorized')
  }
  const mainInfos = await getMainInformations(req.session.userId)
  const informations = await getUserInformations(req.session.userId)
  const pictures = await getPictures(req.session.userId)
  const tags = await getTags(req.session.userId)
  return res.status(200).json({
    main: mainInfos[0], //Object
    informations: informations[0], //Object
    pictures: pictures, //Array
    tags: tags
  })
})

export default router