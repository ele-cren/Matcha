import { viewMessages, sendMessage } from '../utilities/messages'

export const listenView = (socket) => {
  socket.on('view messages', (fromUser, toUser) => {
    viewMessages(fromUser, toUser)
  })
}

export const listenSend = (socket, io) => {
  socket.on('message sent', message => {
    io.emit('message sent', message)
    sendMessage(message)
  })
}