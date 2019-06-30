import Server from 'socket.io'
import { listenView, listenLike } from './loveEvents'
import { listenAdd, listenDelete, listenUpdate } from './notificationEvents'
import { addSession, removeSession, updateLastDisconnect } from '../utilities/updates'
import { listenView as listenMessagesView, listenSend } from './messagesEvents'

const configureSocket = (httpServer) => {
  const io = new Server(httpServer)
  io.on('connection', (socket) => {
    addSession(socket.handshake.query.userId, socket.id)
    io.emit('user connected', socket.handshake.query.userId)
    listenView(socket, io)
    listenLike(socket, io)
    listenAdd(socket, io)
    listenUpdate(socket, io)
    listenDelete(socket, io)
    listenMessagesView(socket)
    listenSend(socket, io)
    socket.on('user disconnected', (userId) => {
      io.emit('user disconnected', userId)
    })
    socket.on('disconnect', () => {
      io.emit('user disconnected', socket.handshake.query.userId)
      updateLastDisconnect(socket.handshake.query.userId)
      removeSession(socket.handshake.query.userId, socket.id)
    })
  })
}

export default configureSocket
