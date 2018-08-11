import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'
import { Transition } from 'react-transition-group'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

import Profile from './Components/Profile'
import Title from './Components/Title'
import Contact from './Components/Contact'

import './App.scss'

library.add(fab)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { animate: true }

    this.contactNewsRef = React.createRef();

    this.setAnimate = this.setAnimate.bind(this)
    this.animateElements = this.animateElements.bind(this)
  }

  setAnimate(animate) {
    this.setState({ animate });
    console.log(this.state.animate)
  }

  animateElements(animate) {
    anime.remove(this.contactNewsRef.current)

    anime({
      targets: this.contactNewsRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? [250, 0] : [0, 250],
      opacity: animate ? [0, 1] : [1, 0],
      delay: 0,
      duration: 1000
    })
  }

  componentDidMount() {
    this.animateElements(this.state.animate)
  }

  render() {
    const { animate } = this.state
    return (
      <div className="site-container">
        <Title />
        <Profile setAnimate={this.setAnimate} />
        <Transition
          in={animate}
          mountOnEnter
          unmountOnExit
          duration={1000}
          timeout={1000}
          onEnter={() => { this.animateElements(animate) }}
          onExit={() => { this.animateElements(animate) }}>
          <div className="contact">
            <div ref={this.contactNewsRef}>
              <Contact />
            </div>
          </div>
        </Transition>
      </div>
    );
  }
}

export default App;
