import React from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SpotifyPlayer from 'react-spotify-player';

import './Music.scss'

import { progressionsLinks, progressionsSpotify, solipsismSpotify } from './Data/Data'
import tidalImgPath from './Images/Tidal.png'
import deezerImgPath from './Images/Deezer.png'

const links = [
  "spotify",
  "soundcloud",
  "apple",
  "tidal",
  "amazon",
  "google",
  "deezer"
]

const progressionsLinksElement = links.map(link =>
  <a href={progressionsLinks[link]} target="_blank">
    {link === 'tidal' ? <img className="progressions-link-image" src={tidalImgPath} alt="Tidal" /> : (link === 'deezer' ? <img className="progressions-link-image" src={deezerImgPath} alt="Tidal" /> :
      <svg className="progressions-link-image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>)}
  </a>
)

const spotify = {
  sizeProgressions: {
    width: '100%',
    height: 250
  },
  sizeSolipsism: {
    width: '100%',
    height: 80
  },
  view: 'list',
  theme: 'black'
}

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
          <div ref={this.musicCircleRef} className="music-circle" />
          <div ref={this.musicRef} className="music-container">
            <Button variant="fab" color="primary" aria-label="Add" onClick={() => { if (animate) setOrReset() }}>
              <UpIcon />
            </Button>
            <h1>MUSIC</h1>
            <h4>jayani tunes coming soon</h4>
            <h2>Old Music</h2>
            <div className="progressions-link-container">
              {progressionsLinksElement}
            </div>
            <h3>Progressions</h3>
            <SpotifyPlayer
              uri={progressionsSpotify}
              size={spotify.sizeProgressions}
              view={spotify.view}
              theme={spotify.theme}
            />
            <h3>Solipsism</h3>
            <SpotifyPlayer
              uri={solipsismSpotify}
              size={spotify.sizeSolipsism}
              view={spotify.view}
              theme={spotify.theme}
            />
          </div>
        </div>
      </Transition>
    )
  }
}

export default Music