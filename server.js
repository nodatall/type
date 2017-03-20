const textSamples = [
  {
    text:
`var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server)

this.playerNumber = playerNumber
this.containerDiv = document.createElement('div')
this.containerDiv.classList.add('playerDisplay')
document.body.appendChild(this.containerDiv)`
  ,
    styles: [
      {
        color: '#EEE',
        length: 139
      }
    ,
      {
        color: '#FFF',
        length: 99
      }
    ]
  }
,
  {
  text:
`socket.on('youArePlayerNumber', function (playerNumber) {
  console.log('I am player', playerNumber)
  playerDisplays[playerNumber].setAsActive()
})`
,
    styles: [
      {
        color: '#FFE',
        length: 1000
      }
    ]
  }
,
  {
    text:
`You are always in a brand new mind place reality.  It just keeps building on previous experience.

The exciting adventure is here!  You cannot escape it!

Each moment has new textures and never before seen combinations of sound and color`
,
    styles: [
      {
        color: '#FFF',
        length: 98
      }
    ,
      {
        color: '#FFF',
        length: 56
      }
    ,
      {
        color: '#b0f0F0',
        length: 83
      }
    ]
  }
,
  {
    text:
`
this.finished = true
this.totalTime = performance.now() - this.startTime
const cps = this.text.length / this.totalTime * 1000
const wpm = cps * 60 / 5
this.accuracy = Math.round(100 * (this.text.length - this.numberOfMistakes) / this.text.length)`,

  styles:
    [
      {
        color: '#FFF',
        length: 1000
      }
    ]
  },
  {
    text:
`let charElement = document.createElement('pre')
charElement.style.display = 'inline'

if ( character === ' ' ) {
  character = '·'
  charElement.style.color = '#DDD'
} else if ( character === '\n' ) {
  character = '¬'
  charElement.style.color = '#DDD'
}`
  ,
    styles: [
      {
        color: '#FF7'
      },
      {
        color: '#FF7'
      }
    ]
  },
  {
    text:
`  }
]
},
{
text:`
  ,
    styles: [
      {
        color: '#77F',
        length: 1000
      }
    ]
  }
]

let level = null

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

  for (let playerNumber = 0; playerNumber < 5; playerNumber++) {
    if (!players[playerNumber].playerOnline) {
      players[playerNumber].playerOnline = true
      players[playerNumber].client = client
      client.emit('youArePlayerNumber', playerNumber)
      console.log('assigned player', playerNumber)
      if (level) {
        client.emit('levelText', textSamples[level])
      }
      break
    }
  }

  client.on('keyPress', function(data) {
    client.broadcast.emit('otherPlayerKeyPress', data)
  })

  client.on('finished', function(data) {
    client.broadcast.emit('otherPlayerFinished', data)
  })

  client.on('selectLevel', function(data) {
    level = data
    io.emit('levelText', textSamples[level])
  })
})

server.listen(3000)
