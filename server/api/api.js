import RegisterRouter from './routes/RegisterRouter'
import ConfirmationRouter from './routes/ConfirmationRouter'

class Api {
  constructor (app) {
    this.app = app
  }

  setRoutes () {
    this.app.use('/api/auth', RegisterRouter)
    this.app.use('/api/', ConfirmationRouter)
  }
}

export default Api