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
import News from './Components/News'

import './App.scss'

library.add(fab)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { site: false, animate: true }

    this.contactNewsRef = React.createRef();
    this.siteRef = React.createRef();

    this.setAnimate = this.setAnimate.bind(this)
    this.animateElements = this.animateElements.bind(this)
    this.openSite = this.openSite.bind(this)
  }

  setAnimate(animate) {
    this.setState({ animate });
  }

  animateElements(animate) {
    anime.remove(this.contactNewsRef.current)

    anime({
      targets: this.contactNewsRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? 0 : 250,
      opacity: animate ? 1 : 0,
      delay: 0,
      duration: 1000
    })
  }

  openSite() {
    anime({
      targets: this.siteRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      opacity: [0, 1],
      delay: 1000,
      duration: 1000
    })
  }

  componentDidMount() {
    this.animateElements(this.state.animate)
    this.setState({ site: true })
  }

  render() {
    const { site, animate } = this.state
    return (
      <div className="site-container">
        <Title />
        <Transition
          in={site}
          mountOnEnter
          unmountOnExit
          duration={2000}
          timeout={2000}
          onEnter={() => { this.openSite() }}
          onExit={() => { this.openSite() }}>
          <div ref={this.siteRef} className="site-elements">
            <Profile setAnimate={this.setAnimate} />
            <Transition
              in={animate}
              duration={1000}
              timeout={1000}
              onEnter={() => { this.animateElements(animate) }}
              onExit={() => { this.animateElements(animate) }}>
              <div className="contact-news">
                <div ref={this.contactNewsRef}>
                  <Contact />
                  <News />
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    );
  }
}

export default App;
