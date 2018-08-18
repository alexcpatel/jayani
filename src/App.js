import React, { Component } from 'react'
import anime from 'animejs'
import { Transition } from 'react-transition-group'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import $ from 'jquery'

import Profile from './Components/Profile'
import Title from './Components/Title'
import Contact from './Components/Contact'
import News from './Components/News'

import './App.scss'

library.add(fab)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { data: null, animate: false }

    this.contactNewsRef = React.createRef();
    this.siteRef = React.createRef();

    this.setAnimate = this.setAnimate.bind(this)
    this.animateElements = this.animateElements.bind(this)
    this.openSite = this.openSite.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    $.ajax({
      url: `${process.env.PUBLIC_URL}/data/data.json`,
      dataType: 'json',
      cache: false,
      success: (data) => {
        console.log(data.config.merch)
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.log(err);
        alert(err);
      }
    });
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
      translateY: animate ? 0 : 400,
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
      duration: 500
    })
    this.setState({ animate: true })
  }

  componentDidMount() {
    this.animateElements(this.state.animate)
    this.getData()
  }

  render() {
    const { data, animate } = this.state
    return (
      <div className="site-container">
        <Title />
        <Transition
          in={data !== null}
          mountOnEnter
          unmountOnExit
          duration={2000}
          timeout={2000}
          onEnter={() => { this.openSite() }}>
          <div ref={this.siteRef} className="site-elements">
            <Profile data={data} setAnimate={this.setAnimate} />
            <Transition
              in={animate}
              duration={1000}
              timeout={1000}
              onEnter={() => { this.animateElements(animate) }}
              onExit={() => { this.animateElements(animate) }}>
              <div className="contact-news">
                <div className="contact-news-container" ref={this.contactNewsRef}>
                  <Contact data={data} />
                  <News data={data} />
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
