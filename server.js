const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)

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

  for (let playerNumber = 0; playerNumber < 3; playerNumber++) {
    if (!players[playerNumber].playerOnline) {
      players[playerNumber].playerOnline = true
      players[playerNumber].client = client
      client.emit('youArePlayerNumber', playerNumber)
      console.log('assigned player', playerNumber)
      break
    }
  }

  client.on('keyPress', function(data) {
    client.broadcast.emit('otherPlayerKeyPress', data)
  })

  client.on('finished', function(data) {
    client.broadcast.emit('otherPlayerFinished', data)
  })
})

server.listen(3000)
