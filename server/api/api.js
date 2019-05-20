import RegisterRouter from './routes/auth/registerRouter'
import ConfirmationRouter from './routes/auth/confirmationRouter'
import LoginRouter from './routes/auth/loginRouter'
import ResetPassRouter from './routes/auth/resetPassRouter'
import UpdateProfileRouter from './routes/profile/updateProfileRouter'
import LogoutRouter from './routes/auth/logoutRouter'
import ProfileRouter from './routes/profile/profileRouter'
import UpdateActiveRouter from './routes/user/updateActive'
import LoveInfosRouter from './routes/love/loveInformations'

class Api {
  constructor (app) {
    this.app = app
  }

  setRoutes () {
    this.app.use('/api/auth', RegisterRouter)
    this.app.use('/api/auth', LoginRouter)
    this.app.use('/api/auth', ResetPassRouter)
    this.app.use('/api/auth', LogoutRouter)
    this.app.use('/api/user', UpdateActiveRouter)
    this.app.use('/api/', ConfirmationRouter)
    this.app.use('/api/profile', ProfileRouter)
    this.app.use('/api/profile', UpdateProfileRouter)
    this.app.use('/api/love', LoveInfosRouter)
  }
}

export default Api
