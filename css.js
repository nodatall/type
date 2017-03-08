setStyleByElement(document.body, {
  backgroundColor: '#222',
  color: '#FFF',
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '1px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
})

function css_scoreScreenStyles() {

  setStyleByClassName('leaderBoard', {
    height: '300px',
    width: '500px',
    border: '1px solid black',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: '0'
  })

  setStyleByClassName('statistics', {
    color: '#000'
  })

}

function setStyleByElement (element, style) {
  Object.assign(element.style, style)
}

function setStyleByClassName (elementClassName, style) {
  setStyleByElement(document.getElementById(elementClassName), style)
}
