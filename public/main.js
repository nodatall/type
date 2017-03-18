const textSamples = [
`var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server)

this.playerNumber = playerNumber
this.containerDiv = document.createElement('div')
this.containerDiv.classList.add('playerDisplay')
document.body.appendChild(this.containerDiv)`,

`socket.on('youArePlayerNumber', function (playerNumber) {
  console.log('I am player', playerNumber)
  playerDisplays[playerNumber].setAsActive()
})`,

`You are always in a brand new mind place reality.  It just keeps building on previous experience.

The exciting adventure is here!  You cannot escape it!

Each moment has new textures and never before seen combinations of sound and color`
]

const style = [
  ['#EEE', '#FFF'],
  ['#FFE'],
  ['#FFF', '#FFF', '#b0f0F0']
]

const socket = io()

class PlayerDisplay {
  constructor (playerNumber) {
    this.playerNumber = playerNumber
    this.containerDiv = document.createElement('div')
    this.containerDiv.classList.add('playerDisplay')
    document.body.appendChild(this.containerDiv)

    this.nameDiv = document.createElement('div')
    this.nameDiv.appendChild(document.createTextNode('Player ' + playerNumber))
    this.nameDiv.classList.add('playerLabel')
    this.containerDiv.appendChild(this.nameDiv)

    this.textDiv = document.createElement('div')
    this.containerDiv.appendChild(this.textDiv)

    this.text = textSamples[0]

    this.charElements = this.text.split('').map(this.addCharacter.bind(this))

    this.startTime = null
    this.totalTime = null
    this.numberOfMistakes = 0
    this.position = 0
    this.finished = false
  }

  addCharacter (character, position) {
    let charElement = document.createElement('pre')
    charElement.style.display = 'inline'

    if ( character === ' ' ) {
      character = '·'
      charElement.style.color = '#DDD'
    } else if ( character === '\n' ) {
      character = '¬'
      charElement.style.color = '#DDD'
    }

    const charText = document.createTextNode(character)
    charElement.appendChild(charText)

    charElement.id = position
    this.textDiv.appendChild(charElement)

    if ( character === '¬') {
      this.textDiv.appendChild(document.createElement('br'))
    }
    return charElement
  }

  unhighlightPosition (position) {
    this.charElements[position].style.backgroundColor = null
  }

  highlightPosition (position) {
    this.charElements[position].style.backgroundColor = '#553'
  }

  keyPress (data) {
    const {position, correct} = data
    this.charElements[position].style.color = correct? '#7B7' : '#D44'
  }

  setAsActive () {
    this.nameDiv.classList.add('activePlayerLabel')
    this.highlightPosition(0)

    window.addEventListener('keydown', e => {
      let correct
      if (this.finished) return
      if (e.key.length !== 1 && e.key !== 'Enter') return
      if (e.key === ' ') e.preventDefault()

      if (!this.startTime) this.startTime = performance.now()

      if ( e.key === 'Enter' && this.text.charAt(this.position) === '\n'
        || e.key === this.text.charAt(this.position)) {
        this.charElements[this.position].style.color = '#7B7'
        correct = true
      } else {
        this.charElements[this.position].style.color = '#D44'
        this.numberOfMistakes++
        correct = false
      }

      if (this.position === this.text.length - 1) {
        this.finished = true
        this.totalTime = performance.now() - this.startTime
        const cps = this.text.length / this.totalTime * 1000
        const wpm = cps * 60 / 5
        this.accuracy = Math.round(100 * (this.text.length - this.numberOfMistakes) / this.text.length)
        this.createLeaderBoard(Math.round(cps), Math.round(wpm), this.accuracy)
        socket.emit('finished', {
          cps: Math.round(cps),
          wpm: Math.round(wpm),
          accuracy: this.accuracy,
          playerNumber: this.playerNumber
        })
        return
      }

      socket.emit('keyPress', {
        position: this.position,
        correct: correct,
        playerNumber: this.playerNumber
      })

      this.unhighlightPosition(this.position)
      this.position++
      this.highlightPosition(this.position)
    })
  }

  createLeaderBoard(cps, wpm, accuracy) {
    const leaderboard = document.createElement('div')
    leaderboard.classList.add('leaderBoard')
    this.containerDiv.appendChild(leaderboard)
    const statistics = document.createElement('div')
    statistics.classList.add('statistics')
    statistics.innerText = `${cps} characters per second\n${wpm} words per minute\n${accuracy}% accuracy`
    leaderboard.appendChild(statistics)
    css_scoreScreenStyles()
  }
}

playerDisplays =  Array(3).fill(null).map((e, index) => new PlayerDisplay(index))

socket.on('youArePlayerNumber', function (playerNumber) {
  console.log('I am player', playerNumber)
  playerDisplays[playerNumber].setAsActive()
})

socket.on('otherPlayerKeyPress', function (data) {
  playerDisplays[data.playerNumber].keyPress({
    position: data.position,
    correct: data.correct
  })
})

socket.on('otherPlayerFinished', function (data) {
  playerDisplays[data.playerNumber].createLeaderBoard(data.cps, data.wpm, data.accuracy)
})
