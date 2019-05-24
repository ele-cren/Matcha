import { viewUser } from '../utilities/loveManager'

export const listenView = (socket, io) => {
  socket.on('view user', (userId, userTarget, userProfile) => {
    io.emit('view user', userId, userTarget, userProfile)
    viewUser(userId, userTarget)
  })
}