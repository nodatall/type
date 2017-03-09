var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server)

app.use(express.static('public'))

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/main.html')
})

io.on('connection', function (client) {
  console.log('A client connected')

  client.emit('welcome')

  // Send a 'newClientConnected' message to all clients
  // The client id is sent along with the message as data
  io.emit('newClientConnected', client.id)

  // This sets up a listener for a 'makeAnnoucement' message
  client.on('makeAnnouncement', function (data) {
    // This function gets run whenever a 'makeAnnoucement' message is recieved
    // 'data' is the data that was sent along with the message

    // Send an 'announcement' message to all clients with data 'data'
    io.emit('announcement', data)
  })

  // This sets up a listener for a 'disconnect' message
  // which is automatically sent when a client disconnects
  client.on('disconnect', function () {
    // Send a 'clientDisconnected' message to all clients
    // The id of the client who disconnected is sent as data with the message
    io.emit('clientDisconnected', client.id)
  })
})

server.listen(3000)
