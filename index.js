
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    // methods: ['GET', 'POST']
  }
})
app.set('socketio', io)

const hendleSocket = require('./sockets/hendleSocket')

const onConnection = (socket) => {
  console.log('\x1b[36m user conected \x1b[0m '),
  hendleSocket(io, socket)
}

io.on('connection', onConnection)

server.listen(config.PORT, () => {
  logger.info(`Server running on port \x1b[36m, ${config.PORT}\x1b[0m`)
})









