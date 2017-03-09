class PlayerDisplay {
  constructor () {
    this.text = `var after = require('after');`
    this.startTime = null
    this.totalTime = null
    this.numberOfMistakes = 0
    this.position = 0
    this.finished = false
    this.textDiv = document.createElement('div')
    this.charElements = this.text.split('').map(this.addCharacter.bind(this))
    document.body.appendChild(this.textDiv)
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
      if (this.finished) return
      if (e.key.length !== 1 && e.key !== 'Enter') return
      if (e.key === ' ') e.preventDefault()

      if (!this.startTime) this.startTime = performance.now()

      if ( e.key === 'Enter' && this.text.charAt(this.position) === '\n'
        || e.key === this.text.charAt(this.position)) {
        this.charElements[this.position].style.color = '#7B7'
      } else {
        this.charElements[this.position].style.color = '#D44'
        this.numberOfMistakes++
      }

      this.unhighlightPosition(this.position)
      if (this.position === this.text.length - 1) {
        this.finished = true
        this.totalTime = performance.now() - this.startTime
        const cps = this.text.length / this.totalTime * 1000
        const wpm = cps * 60 / 5
        this.accuracy = Math.round(100 * (this.text.length - this.numberOfMistakes) / this.text.length)
        this.createLeaderBoard(Math.round(cps), Math.round(wpm), this.accuracy)
        return
      }
      this.position++
      this.highlightPosition(this.position)
    })
  }

  createLeaderBoard(cps, wpm, accuracy) {
    const leaderboard = document.createElement('div')
    leaderboard.id = 'leaderBoard'
    document.body.appendChild(leaderboard)
    const statistics = document.createElement('div')
    statistics.id = 'statistics'
    statistics.innerText = `${cps} characters per second\n${wpm} words per minute\n${accuracy}% accuracy`
    leaderboard.appendChild(statistics)
    css_scoreScreenStyles()
  }
}

const player1Display = new PlayerDisplay()

player1Display.setAsActive()
