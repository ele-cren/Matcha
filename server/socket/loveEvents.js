import { viewUser } from '../utilities/loveManager'

export const listenView = (socket, io) => {
  socket.on('view user', (userId, userTarget) => {
    io.emit('view user', userId, userTarget)
    viewUser(userId, userTarget)
  })
}