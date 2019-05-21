import Server from 'socket.io'

const configureSocket = (httpServer) => {
  const io = new Server(httpServer)
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected ' + socket.id)
    })
  })
}

export default configureSocket
