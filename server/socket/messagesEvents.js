import { viewMessages } from '../utilities/messages'

export const listenView = (socket) => {
  socket.on('view messages', (fromUser, toUser) => {
    viewMessages(fromUser, toUser)
  })
}