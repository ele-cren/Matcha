import RegisterRouter from './routes/auth/registerRouter'
import ConfirmationRouter from './routes/auth/confirmationRouter'
import LoginRouter from './routes/auth/loginRouter'
import ResetPassRouter from './routes/auth/resetPassRouter'
import UpdateProfileRouter from './routes/profile/updateProfileRouter'
import LogoutRouter from './routes/auth/logoutRouter'
import ProfileRouter from './routes/profile/profileRouter'
import UpdateActiveRouter from './routes/user/updateActive'
import LoveInfosRouter from './routes/love/loveInformations'
import GetNotifications from './routes/notifications/getNotifications'
import GetProfilesRouter from './routes/search/profilesRoute'
import BlockedRouter from './routes/ban/blockUserRouter'
import ReportedRouter from './routes/ban/reportUserRouter'
import UploadRouter from './routes/upload/uploadRoute'
import MessagesRouter from './routes/messages/messagesRouter'

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
    this.app.use('/api/profiles', GetProfilesRouter)
    this.app.use('/api/ban', BlockedRouter)
    this.app.use('/api/ban', ReportedRouter)
    this.app.use('/api/love', LoveInfosRouter)
    this.app.use('/api/notifications', GetNotifications)
    this.app.use('/api', UploadRouter)
    this.app.use('/api/', MessagesRouter)
  }
}

export default Api
