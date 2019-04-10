import Server from './server'
import Api from './api/api'

const server = new Server()

server.start()

const api = new Api(server.app)
api.setRoutes()

process.on('SIGINT', () => {
  server.stop()
  process.exit(0)
})