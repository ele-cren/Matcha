import { viewUser, likeUser, dislikeUser } from '../utilities/loveManager'
import { updateScore } from '../utilities/updates'

export const listenView = (socket, io) => {
  socket.on('view user', (userId, userTarget, userProfile) => {
    io.emit('view user', userId, userTarget, userProfile)
    viewUser(userId, userTarget)
    updateScore(userTarget, 10)
  })
}

export const listenLike = (socket, io) => {
  socket.on('like user', (userId, userTarget, userProfile) => {
    io.emit('like user', userId, userTarget, userProfile)
    likeUser(userId, userTarget)
    updateScore(userTarget, 20)
  })
  socket.on('dislike user', (userId, userTarget, userProfile) => {
    io.emit('dislike user', userId, userTarget, userProfile)
    dislikeUser(userId, userTarget)
    updateScore(userTarget, -20)
  })
}