import React from 'react'
import ReactDOM from 'react-dom'
import { TransitionGroup, Transition } from 'react-transition-group'
import anime from 'animejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import imgPath from './Images/profilepic.jpg'
import './Profile.scss'

const links = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const hyperlinks = {
  facebook: 'https://www.facebook.com/maxpatelmusic/',
  twitter: 'https://twitter.com/MaxPatel_Music',
  instagram: 'https://www.instagram.com/maxpatelmusic/',
  spotify: 'https://open.spotify.com/artist/3HcJd4UuaOq2pVginUi5MY',
  youtube: 'https://www.youtube.com/channel/UCPtjLE0quEXBH3GH7Kk9m_g',
  soundcloud: 'https://soundcloud.com/maximilian-patel'
}

const translateX = {
  facebook: -120,
  twitter: -80,
  instagram: -30,
  spotify: 30,
  youtube: 80,
  soundcloud: 120
}

const translateY = {
  facebook: -50,
  twitter: -95,
  instagram: -120,
  spotify: -120,
  youtube: -95,
  soundcloud: -50
}

const delays = {
  facebook: 200,
  twitter: 100,
  instagram: 25,
  spotify: 25,
  youtube: 100,
  soundcloud: 200
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { animate: false }

    this.profilePicRef = React.createRef();
    this.facebookRef = React.createRef()
    this.twitterRef = React.createRef()
    this.instagramRef = React.createRef()
    this.spotifyRef = React.createRef()
    this.youtubeRef = React.createRef()
    this.soundcloudRef = React.createRef()
    this.musicRef = React.createRef()

    this.setOrReset = this.setOrReset.bind(this)
    this.animateElements = this.animateElements.bind(this)
  }

  setOrReset() {
    this.setState({
      animate: !this.state.animate
    });
  }

  generateLinkElement = (link) =>
    <div className="link" ref={this[`${link}Ref`]} key={link}>
      <a href={hyperlinks[link]}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <FontAwesomeIcon icon={['fab', link]} />
        </svg>
      </a>
    </div>

  animateElements = (animate) => {
    // PIC ANIMATIONS

    anime({
      targets: this.profilePicRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? 1.5 : 1,
      delay: 0,
      duration: 500
    })

    // LINKS ANIMATIONS

    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      anime({
        easing: 'easeInOutQuart',
        loop: false,
        targets: this[`${link}Ref`].current,
        translateX: animate ? translateX[link] : 0,
        translateY: animate ? translateY[link] : 0,
        delay: delays[link],
        scale: animate ? 1.2 : 1,
        opacity: 1,
        duration: 500
      });
    }

    // MUSIC ANIMATIONS

    anime.timeline()
    .add({
      targets: this.musicRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateX: animate ? -300 : 0,
      translateY: animate ? 300 : 0,
      borderRadius: '50%',
      delay: 500,
      duration: 500
    })
    .add({
      targets: this.musicRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      borderRadius: animate ? '10%' : '50%',
      delay: 0,
      scale: animate ? 2 : 1,
      duration: 500
    })

  }

  render() {
    const { animate } = this.state
    return (
      <div className="profile">
        <Transition
          in={animate}
          duration={2000}
          timeout={2000}
          onEnter={() => { this.animateElements(animate) }}
          onExit={() => { this.animateElements(animate) }}>
          <div>
            <img className="profile-pic" ref={this.profilePicRef} src={imgPath} alt="Profile Pic" onClick={this.setOrReset} />
            {links.map(link => this.generateLinkElement(link))}
            <div className="music" ref={this.musicRef} />
          </div>
        </Transition>
      </div>
    )
  }
}

export default Profile