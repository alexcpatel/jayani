import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import imgPath from './Images/profilepic.jpg'
import './ProfilePic.css';

// PROFILE PIC ELEMENT //

class ProfilePicElement extends React.Component {
  constructor(props) {
    super(props);
    this.picRef = React.createRef()
  }

  componentDidUpdate() {
    const status = this.props.status

    if (status === 'entering') {
      this.animeRef = anime({
        targets: this.picRef.current,
        scale: 1.5,
        duration: 500
      });
    } else if (status === 'exiting') {
      this.animeRef = anime({
        targets: this.picRef.current,
        scale: 1,
        duration: 500
      });
    }
  }

  render() {
    return (
      <div>
        <img src={imgPath} className="profile-pic" ref={this.picRef} alt="Profile Pic" onClick={this.props.handleToggle} />
      </div>
    );
  }
}

// LINK ELEMENTS //

// PARAMETERS //

const translateX = {
  facebook: -120,
  twitter: -80,
  instagram: -26,
  spotify: 26,
  youtube: 80,
  soundcloud: 120
}

const translateY = {
  facebook: -150,
  twitter: -200,
  instagram: -225,
  spotify: -225,
  youtube: -200,
  soundcloud: -150
}

const delay = {
  facebook: 200,
  twitter: 100,
  instagram: 25,
  spotify: 25,
  youtube: 100,
  soundcloud: 200
}

const hyperlinks = {
  facebook: 'https://www.facebook.com/maxpatelmusic/',
  twitter: 'https://twitter.com/MaxPatel_Music',
  instagram: 'https://www.instagram.com/maxpatelmusic/',
  spotify: 'https://open.spotify.com/artist/3HcJd4UuaOq2pVginUi5MY',
  youtube: 'https://www.youtube.com/channel/UCPtjLE0quEXBH3GH7Kk9m_g',
  soundcloud: 'https://soundcloud.com/maximilian-patel'
}

const links = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

class LinksElement extends React.Component {
  constructor(props) {
    super(props);

    this.facebookRef = React.createRef()
    this.twitterRef = React.createRef()
    this.instagramRef = React.createRef()
    this.spotifyRef = React.createRef()
    this.youtubeRef = React.createRef()
    this.soundcloudRef = React.createRef()

    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.generateLinkElement = this.generateLinkElement.bind(this)
  }

  generateLinkElement = (link) =>
    <div ref={this[`${link}Ref`]} key={link}>
      <a className="icon-outer" href={hyperlinks[link]}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <FontAwesomeIcon icon={['fab', link]} />
        </svg>
      </a>
    </div>

  componentDidUpdate() {
    const status = this.props.status

    if (status === 'entering') {
      for (let i = 0; i < links.length; i++) {
        const link = links[i]
        this[`${link}AnimeRef`] = anime({
          targets: this[`${link}Ref`].current,
          translateX: translateX[link],
          translateY: translateY[link],
          delay: delay[link],
          scale: 1.2,
          opacity: 1,
          duration: 500,
          complete: () => {if (i === links.length-1) this.props.registerCompletedAnimation()}
        });
      }
    } else if (status === 'exiting') {
      for (let i = 0; i < links.length; i++) {
        const link = links[i]
        this[`${link}AnimeRef`] = anime({
          targets: this[`${link}Ref`].current,
          translateX: 0,
          translateY: 0,
          delay: delay[link],
          scale: 1,
          opacity: 0,
          duration: 500,
          complete: () => {if (i === links.length-1) this.props.registerCompletedAnimation()}
        });
      }
    }
  }

  render() {
    return (
      <div>
        {links.map(link => this.generateLinkElement(link))}
      </div>
    );
  }
}

class ProfilePic extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false, inAnimation: false }

    this.handleToggle = this.handleToggle.bind(this)
    this.registerCompletedAnimation = this.registerCompletedAnimation.bind(this)
  }

  handleToggle() {
    if (!this.state.inAnimation) {
      this.setState(({ show }) => ({
        show: !show, inAnimation: true
      }))
    }
  }

  registerCompletedAnimation() {
    console.log(this.state.inAnimation)
    if (this.state.inAnimation) {
      this.setState({ inAnimation: false })
    }
  }

  render() {
    const { show } = this.state
    return (
      <div>
        <Transition in={show} timeout={700}>
          {status => (
            <ProfilePicElement status={status} handleToggle={this.handleToggle} registerCompletedAnimation={this.registerCompletedAnimation} />
          )}
        </Transition>
        <Transition in={show} timeout={700}>
          {status => (
            <LinksElement status={status} registerCompletedAnimation={this.registerCompletedAnimation} />
          )}
        </Transition>
      </div>
    )
  }
}

export default ProfilePic