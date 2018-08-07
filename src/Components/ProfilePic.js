import React, { Component } from 'react'
import Anime from "react-anime"
import imgPath from "./Images/profilepic.jpg"
import './ProfilePic.css'

class ProfilePicElement extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.generateAnimation = this.generateAnimation.bind(this)
  }

  handleClick = () => {
    this.props.onClick();
  }

  generateAnimation() {
    console.log(this.props.profilePicAnimationStatus);
    const dir = this.props.profilePicAnimationStatus
    const next = dir === 'normal' ? 'in' : (dir === 'reverse' ? 'out' : null)
    if (dir === 'normal' || dir === 'reverse') {
      return (
        <Anime
          key="UNIQUEID100299"
          easing="easeOutElastic"
          loop={false}
          duration={1000}
          direction={dir}
          complete={anim => {this.props.updateProfilePicAnimationStatus(next)}}
          delay={(el, index) => index * 240}
          scale={2}>
          <img className="profile-pic" src={imgPath} alt="Profile Pic" />
        </Anime>)
    } else return <img className="profile-pic" src={imgPath} alt="Profile Pic" />
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.generateAnimation()}
      </div>
    )
  }
}

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicAnimationStatus: 'out'
    };
    this.handleProfilePicClick = this.handleProfilePicClick.bind(this)
    this.updateProfilePicAnimationStatus = this.updateProfilePicAnimationStatus.bind(this)
  }

  updateProfilePicAnimationStatus(animationStatus) {
    this.setState({ animationStatus: animationStatus });
  }

  handleProfilePicClick() {
    if (this.state.profilePicAnimationStatus === 'out') {
      this.setState({ profilePicAnimationStatus: 'normal' })
    } else if (this.state.profilePicAnimationStatus === 'in') {
      this.setState({ profilePicAnimationStatus: 'reverse' })
    }
  }

  render() {
    return (
      <div>
        <ProfilePicElement
          onClick={this.handleProfilePicClick}
          profilePicAnimationStatus={this.state.profilePicAnimationStatus}
          updateProfilePicAnimationStatus={this.updateProfilePicAnimationStatus}
        />
      </div>
    );
  }
}

export default ProfilePic;