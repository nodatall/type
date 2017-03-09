var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server)

const players = [
  {
    playerOnline: false,
    client: null
  },
  {
    playerOnline: false,
    client: null
  },
  {
    playerOnline: false,
    client: null
  }
]

app.use(express.static('public'))

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/main.html')
})

io.on('connection', function (client) {
  console.log('A client connected')

  for (let playerNumber = 1; playerNumber <= 3; playerNumber++) {
    if (!players[playerNumber - 1].playerOnline) {
      players[playerNumber - 1].playerOnline = true
      players[playerNumber - 1].client = client
      client.emit('youArePlayerNumber', playerNumber)
      console.log('assigned player', playerNumber)
      break
    }
  }

  io.emit('newClientConnected', client.id)

  client.on('makeAnnouncement', function (data) {
    io.emit('announcement', data)
  })

  client.on('disconnect', function () {
    io.emit('clientDisconnected', client.id)
  })

  client.on('keyPress', function(data) {
    client.broadcast.emit('otherKeyPress', data)
    console.log('key pressed elsewhere:', data)
  })
})

server.listen(3000)
