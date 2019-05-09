import express from 'express'
import bodyParser from 'body-parser'
import session from 'cookie-session'
require('dotenv').config()

class Server {
  constructor () {
    this.configure()
  }

  configure () {
    this.app = express()
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json())
    this.app.use(session({
      name: 'session',
      secret: process.env.SESSION_SECRET,
      maxAge: 60 * 60 * 1000 * 24 * 365
    }))
  }

  start (port = 3000) {
    this.server = this.app.listen(port)
  }

  stop () {
    this.server.close()
  }
}

export default Server
