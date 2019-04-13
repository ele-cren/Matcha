import RegisterRouter from './routes/registerRouter'
import ConfirmationRouter from './routes/confirmationRouter'
import LoginRouter from './routes/loginRouter'

class Api {
  constructor (app) {
    this.app = app
  }

  setRoutes () {
    this.app.use('/api/auth', RegisterRouter)
    this.app.use('/api/auth', LoginRouter)
    this.app.use('/api/', ConfirmationRouter)
    this.app.get('/api/testsession', (req, res) => {
      return res.json(req.session.userId)
    })
  }
}

export default Api