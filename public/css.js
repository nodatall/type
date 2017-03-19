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
  borderRight: '1px solid #444',
  borderLeft: '1px solid #444',
  padding: '10px 10px',
})

function css_scoreScreenStyles() {

  setStyleByClassName('leaderBoard', {
    border: '1px solid white',
    padding: '10px',
    margin: '20px'
  })

  setStyleByClassName('statistics', {
    color: '#fff'
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
