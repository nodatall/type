setStyleByElement(document.body, {
  backgroundColor: '#222',
  color: '#FFF',
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '1px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'relative',
  height: '100vh'
})

setStyleByClassName('playerDisplay', {
  borderRight: '1px solid #777',
  borderLeft: '1px solid #777',
})

function css_scoreScreenStyles() {

  setStyleByClassName('leaderBoard', {
    border: '1px solid black',
    backgroundColor: '#FFF',
    padding: '10px',
    margin: '10px'
  })

  setStyleByClassName('statistics', {
    color: '#000'
  })

}

function setStyleByElement (element, style) {
  Object.assign(element.style, style)
}

function setStyleByClassName (elementClassName, style) {
  Array.from(document.getElementsByClassName(elementClassName)).forEach(
    element => setStyleByElement(element, style)
  )
}
