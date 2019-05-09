import auth from 'basic-auth'
import express from 'express'

const router = express.Router()
const admins = {
  username: 'admin',
  password: 'myawesomeadmin'
}


router.get('/populate', (req, res) => {
  const user = auth(req)
  console.log(req.headers.authorization)
  if (!user || !admins.username || admins.password !== user.pass) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Needed"')
    return res.status(401).send()
  } else {
    return res.status(200).send('Hello mon pote')
  }
})

export default router