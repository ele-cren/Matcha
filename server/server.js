import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
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
    this.app.use(bodyParser.json());
    this.app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
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
