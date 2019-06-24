import express from 'express'
import bodyParser from 'body-parser'
import session from 'cookie-session'
import path from 'path'
import http from 'http'
require('dotenv').config()
import configureSocket from './socket/socket'

class Server {
  constructor () {
    this.configure()
  }

  configure () {
    this.app = express()
    this.server = http.createServer(this.app)
    configureSocket(this.server)
    const upladsFolder = path.join(__dirname, 'uploads')
    this.app.use(express.static(upladsFolder))
    this.app.use(bodyParser.urlencoded({
      extended: true
    }))
    this.app.use(bodyParser.json())
    this.app.use(session({
      name: 'session',
      secret: process.env.SESSION_SECRET,
      maxAge: 60 * 60 * 1000 * 24 * 365
    }))
  }

  start (port = 3000) {
    this.server.listen(port)
  }

  stop () {
    this.server.close()
  }
}

export default Server
