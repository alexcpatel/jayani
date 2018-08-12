import React from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import anime from 'animejs'

import './Music.scss'

class Music extends React.Component {
  constructor(props) {
    super(props)

    this.musicCircleRef = React.createRef()
    this.musicRef = React.createRef()

    this.animateElements = this.animateElements.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.musicCircleRef.current)
    anime.remove(this.musicRef.current)

    // GROWING CIRCLE ANIMATION
    anime({
      targets: this.musicCircleRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? [0, 1] : [1, 0],
      delay: animate ? 0 : 300,
      duration: 1000
    })

    // ENTER MUSIC CONTAINER ANIMATION
    anime({
      targets: this.musicRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? ['-100vh', '0vh'] : ['0vh', '-100vh'],
      delay: animate ? 300 : 0,
      duration: 1000
    })
  }

  render() {
    const { animate, setOrReset } = this.props
    return (
      <Transition
        in={animate}
        mountOnEnter
        unmountOnExit
        duration={2000}
        timeout={2000}
        onEnter={() => { this.animateElements(animate) }}
        onExit={() => { this.animateElements(animate) }}>
        <div>
          <div ref={this.musicCircleRef} className="music-circle" onClick={setOrReset} />
          <div ref={this.musicRef} className="music-container">
          </div>
        </div>
      </Transition>
    )
  }
}

export default Music