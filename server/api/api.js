import RegisterRouter from './routes/registerRouter'
import ConfirmationRouter from './routes/confirmationRouter'
import LoginRouter from './routes/loginRouter'
import ResetPassRouter from './routes/resetPassRouter'
import UpdateProfileRouter from './routes/updateProfileRouter'

class Api {
  constructor (app) {
    this.app = app
  }

  setRoutes () {
    this.app.use('/api/auth', RegisterRouter)
    this.app.use('/api/auth', LoginRouter)
    this.app.use('/api/auth', ResetPassRouter)
    this.app.use('/api/', ConfirmationRouter)
    this.app.use('/api/profile', UpdateProfileRouter)
  }
}

export default Api