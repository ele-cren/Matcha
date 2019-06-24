import Server from 'socket.io'
import { listenView, listenLike } from './loveEvents'
import { listenAdd, listenDelete, listenUpdate } from './notificationEvents'
import { addSession, removeSession, updateLastDisconnect } from '../utilities/updates'
import { listenView as listenMessagesView } from './messagesEvents'

const configureSocket = (httpServer) => {
  const io = new Server(httpServer)
  io.on('connection', (socket) => {
    addSession(socket.handshake.query.userId, socket.id)
    listenView(socket, io)
    listenLike(socket, io)
    listenAdd(socket, io)
    listenUpdate(socket, io)
    listenDelete(socket, io)
    listenMessagesView(socket)
    socket.on('disconnect', () => {
      updateLastDisconnect(socket.handshake.query.userId)
      removeSession(socket.handshake.query.userId, socket.id)
    })
  })
}

export default configureSocket
