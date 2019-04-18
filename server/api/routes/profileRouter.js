import express from 'express'
import { connection } from '../../app'

const router = express.Router()

const getUserInformations = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT u.first_name, u.last_name, u.email, i.bio, i.orientation, i.genre, p.id picture_id FROM users u,\
                      informations i, pictures p WHERE i.user_id=p.user_id AND i.user_id=u.uuid AND u.uuid=?", [userId], (err, results) => {
      if (err) {
        reject(err)
      }
      resolve(results)
    })
  })
}

router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized access')
  }
  const informations = await getUserInformations(req.session.userId)
  return res.status(200).json({
    results: informations
  })
})

export default router