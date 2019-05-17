import express from 'express'
import { connection } from '../../../app'
import { viewUser } from '../../../utilities/loveManager'

const router = express.Router()

const getUserInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM informations WHERE user_id=?", [userId], (err, results) => {
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

const getLovers = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT user_id FROM love WHERE user_target=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
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

router.get('/:userId', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not Authorized')
  }
  const userId = req.params.userId
  if (userId !== req.session.userId) {
    viewUser(req.session.userId, userId)
  }
  const mainInfos = await getMainInformations(userId)
  const informations = await getUserInformations(userId)
  const pictures = await getPictures(userId)
  const tags = await getTags(userId)
  return res.status(200).json({
    main: mainInfos[0], //Object
    informations: informations[0], //Object
    pictures: pictures, //Array
    tags: tags
  })
})

router.get('/:userId/lovers', async (req, res) => {
  const lovers = await getLovers(req.params.userId)
  let loversInfos = []
  for (const lover of lovers) {
    const mainInfos = await getMainInformations(lover.user_id)
    const informations = await getUserInformations(lover.user_id)
    const pictures = await getPictures(lover.user_id)
    let mainPicture = ''
    pictures.map(x => {
      if (x.main) {
        mainPicture = x.url
      }
    })
    loversInfos = [
      ...loversInfos,
      {
        mainInformations: mainInfos[0],
        informations: informations[0],
        mainPicture: mainPicture
      }
    ]
  }
  return res.status(200).json({
    lovers: loversInfos
  })
})

export default router