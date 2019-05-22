import Server from 'socket.io'
import { listenView } from './loveEvents'

const configureSocket = (httpServer) => {
  const io = new Server(httpServer)
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id)
    listenView(socket, io)
    socket.on('disconnect', () => {
      console.log('user disconnected ' + socket.id)
    })
  })
}

export default configureSocket
