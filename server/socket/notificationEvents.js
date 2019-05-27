import { addNotif, updateNotif, deleteNotif } from '../utilities/notifications'

export const listenAdd = (socket, io) => {
  socket.on('add notification', (notification) => {
    io.emit('add notification', notification)
    addNotif(notification)
  })
}

export const listenUpdate = (socket, io) => {
  socket.on('update notification', (notifId) => {
    updateNotif(notifId)
  })
}

export const listenDelete = (socket, io) => {
  socket.on('delete notification', (notifId) => {
    deleteNotif(notifId)
  })
}