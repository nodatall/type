function addCharacter(character, position) {
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
  textDiv.appendChild(charElement)

  if ( character === '¬') {
    textDiv.appendChild(document.createElement('br'))
  }
  return charElement
}

function unhighlightPosition(position) {
  charElements[position].style.backgroundColor = null
}

function highlightPosition(position) {
  charElements[position].style.backgroundColor = '#BBB'
}

const textDiv = document.createElement('div')
document.body.appendChild(textDiv)

const text = `var after = require('after');`

const charElements = text.split('').map(addCharacter)

let startTime, numberOfMistakes = 0, position = 0, finished = false

window.addEventListener('keydown', e => {
  if (finished) return
  if (e.key.length !== 1 && e.key !== 'Enter') return
  if (e.key === ' ') e.preventDefault()

  if (!startTime) startTime = performance.now()

  if ( e.key === 'Enter' && text.charAt(position) === '\n'
    || e.key === text.charAt(position)) {
    charElements[position].style.color = '#7B7'
  } else {
    charElements[position].style.color = '#D44'
    numberOfMistakes++
  }

  unhighlightPosition(position)
  if (position === text.length - 1) {
    finished = true
    const totalTime = performance.now() - startTime,
      CPS = Math.round(text.length / totalTime * 1000),
      WPM = CPS * 60 / 5,
      accuracy = Math.round(100 * (text.length - numberOfMistakes) / text.length)
      createLeaderBoard(CPS, WPM, accuracy)
    return
  }
  position++
  highlightPosition(position)
})

function createLeaderBoard(CPS, WPM, accuracy) {
  const leaderboard = document.createElement('div')
  leaderboard.id = 'leaderBoard'
  document.body.appendChild(leaderboard)
  const statistics = document.createElement('div')
  statistics.id = 'statistics'
  statistics.innerText = `${CPS} characters per second\n${WPM} words per minute\n${accuracy}% accuracy`
  leaderboard.appendChild(statistics)
  css_scoreScreenStyles()
}
