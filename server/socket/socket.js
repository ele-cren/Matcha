import Server from 'socket.io'
import { listenView, listenLike } from './loveEvents'
import { listenAdd, listenDelete, listenUpdate } from './notificationEvents'
import { addSession, removeSession } from '../utilities/updates'

const configureSocket = (httpServer) => {
  const io = new Server(httpServer)
  io.on('connection', (socket) => {
    addSession(socket.handshake.query.userId, socket.id)
    console.log('a user connected ' + socket.id)
    listenView(socket, io)
    listenLike(socket, io)
    listenAdd(socket, io)
    listenUpdate(socket, io)
    listenDelete(socket, io)
    socket.on('disconnect', () => {
      console.log('user disconnected ' + socket.id)
      removeSession(socket.handshake.query.userId, socket.id)
    })
  })
}

export default configureSocket
