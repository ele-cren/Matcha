import RegisterRouter from './routes/RegisterRouter'

class Api {
  constructor (app) {
    this.app = app
  }

  setRoutes () {
    this.app.use('/api/auth', RegisterRouter)
  }
}

export default Api