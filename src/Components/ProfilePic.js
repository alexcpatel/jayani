import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import anime from 'animejs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import imgPath from './Images/profilepic.jpg'
import './ProfilePic.css';

const duration = 500

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
        scale: 2,
        duration: duration
      });
    } else if (status === 'exiting') {
      this.animeRef = anime({
        targets: this.picRef.current,
        scale: 1,
        duration: duration
      });
    }
  }

  render() {
    return (
      <div>
        <img src={imgPath} className="profile-pic" ref={this.picRef} alt="Profile Pic" />
        <div ref={this.plugRef}>
          <a className="icon-outer"><FontAwesomeIcon icon={['fab', 'facebook-square']} /></a>
        </div>
      </div>
    );
  }
}

class ProfilePic extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState(({ show }) => ({
      show: !show
    }))
  }

  render() {
    const { show } = this.state
    return (
      <div>
        <div onClick={this.handleToggle}>
          <Transition in={show} timeout={duration}>
            {status => (
              <ProfilePicElement status={status} />
            )}
          </Transition>
        </div>
      </div>
    )
  }
}

export default ProfilePic