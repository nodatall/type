class PlayerDisplay {
  constructor (playerName) {
    this.playerName = playerName
    this.containerDiv = document.createElement('div')
    document.body.appendChild(this.containerDiv)

    this.textDiv = document.createElement('div')
    this.containerDiv.appendChild(this.textDiv)

    this.nameDiv = document.createElement('div')
    this.nameDiv.appendChild(document.createTextNode(playerName))
    this.containerDiv.appendChild(this.textDiv)

    this.text = `var after = require('after');`
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
    this.charElements[position].style.backgroundColor = '#BBB'
  }

  setAsActive () {
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
        return
      }
      this.unhighlightPosition(this.position)
      this.position++
      this.highlightPosition(this.position)

      socket.emit('keyPress', {
        position: this.position,
        correct: correct,
        playerName: this.playerName
      })
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

playerDisplays =  Array(3).fill(null).map((e, index) => new PlayerDisplay('Player ' + index + 1))

socket.on('youArePlayerNumber', function (data) {
  console.log('i am player', data)
  playerDisplays[data - 1].setAsActive()
})
