
module.exports = (io, socket) => {
  // получение задач
  const receiveMessage = () => {
    console.log('\x1b[36m receiveMessage emit \x1b[0m ')


    io.emit('todos', ' 11111111111 ')
  }

  // добавление задачи
  const chatMessage = (msg) => {
    console.log('\x1b[33m message: ' + msg + '\x1b[0m')

  }

  // удаление задачи по идентификатору
  // const disconnect = (id) => {
  //   console.log('user disconnected')


  //   getTodos()
  // }

  socket.on('chat message', chatMessage)
  socket.emit('RECEIVE_MESSAGE', 'receiveMessage')
  // socket.on('connection', connection)
  // socket.on('disconnect', disconnect)
}
