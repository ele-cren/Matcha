import express from 'express'
import bodyParser from 'body-parser'

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
  }

  start (port = 3000) {
    this.server = this.app.listen(port)
  }

  stop () {
    this.server.close()
  }
}

export default Server
