Object.assign(document.body.style, {
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
  Object.assign(document.getElementById('leaderBoard').style, {
    height: '300px',
    width: '500px',
    border: '1px solid black',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: '0'
  })

  Object.assign(document.getElementById('statistics').style, {
    color: '#000'
  })
}
