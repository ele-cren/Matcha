import { viewUser, likeUser, dislikeUser } from '../utilities/loveManager'

export const listenView = (socket, io) => {
  socket.on('view user', (userId, userTarget, userProfile) => {
    io.emit('view user', userId, userTarget, userProfile)
    viewUser(userId, userTarget)
  })
}

export const listenLike = (socket, io) => {
  socket.on('like user', (userId, userTarget, userProfile) => {
    io.emit('like user', userId, userTarget, userProfile)
    likeUser(userId, userTarget)
  })
  socket.on('dislike user', (userId, userTarget, userProfile) => {
    io.emit('dislike user', userId, userTarget, userProfile)
    dislikeUser(userId, userTarget)
  })
}