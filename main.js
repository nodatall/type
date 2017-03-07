function addCharacter(character, position) {
  let charElement

  charElement = document.createElement('pre')
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

Object.assign(document.body.style, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const textDiv = document.createElement('div')
document.body.appendChild(textDiv)
document.body.style.backgroundColor = '#222'
document.body.style.color = '#FFF'
document.body.style.fontSize = '18px'
document.body.style.lineHeight = '25px'
document.body.style.letterSpacing = '1px'

const text = `var after = require('after');
var should = require('should');
var express = require('../')
, Route = express.Route
, methods = require('methods')
, assert = require('assert');`

const charElements = text.split('').map(addCharacter)

let position = 0

let startTime, numberOfMistakes = 0

window.addEventListener('keydown', e => {
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
    const totalTime = performance.now() - startTime,
      CPS = Math.round(text.length / totalTime * 1000),
      WPM = CPS * 60 / 5,
      accuracy = Math.round(100 * (text.length - numberOfMistakes) / text.length)
    alert(`${CPS} characters per second\n${WPM} words per minute\n${accuracy}% accuracy`)
    return
  }
  position++
  highlightPosition(position)
})
