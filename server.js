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

  io.emit('newClientConnected', client.id)

  client.on('makeAnnouncement', function (data) {
    io.emit('announcement', data)
  })

  client.on('disconnect', function () {
    io.emit('clientDisconnected', client.id)
  })
})

server.listen(3000)
