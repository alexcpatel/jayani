import React, { Component } from 'react'
import Anime from "react-anime"
import './Title.css'

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationStatus: 'out'
    }
    this.setAnimationStatus = this.setAnimationStatus.bind(this)
    this.generateAnimation = this.generateAnimation.bind(this)
  }

  setAnimationStatus(animationStatus) {
    this.setState({ animationStatus: animationStatus })
  }

  generateAnimation() {
    const dir = this.state.animationStatus
    const next = dir === 'normal' ? 'in' : (dir === 'reverse' ? 'out' : null)
    if (dir === 'normal' || dir === 'reverse') {
      return (<Anime
        key={this.props.id}
        easing="easeOutQuad"
        duration={1500}
        loop={false}
        delay={(el, index) => index * 200}
        direction={'alternate'}
        complete={anim => {this.setAnimationStatus(next)}}
        strokeDashoffset={(el) => {
          var pathLength = 0;
          if (el.getTotalLength) {
            pathLength = el.getTotalLength();
            el.setAttribute('stroke-dasharray', pathLength);
          }
          return [pathLength, 0];
        }}>
        <path className="st1" d="m47.694 31.796q0 0.60772-0.38447 0.99219-0.38447 0.38447-0.99219 0.38447h-4.5145q-0.60772 0-0.99219-0.38447-0.38447-0.38447-0.38447-0.99219v-4.9237h1.7239v4.7749h3.8199v-17.884h1.7239z" />
        <path className="st1" d="m58.608 33.173h-1.7115l-0.68213-4.316h-3.8571l-0.68213 4.316h-1.6619v-0.04961l3.4603-19.41h1.6991zm-2.6169-5.8415-1.6991-10.517-1.7115 10.517z" />
        <path className="st1" d="m68.753 13.875-2.3564 7.8507q-0.44648 1.1782-1.1782 3.9315v7.5158h-1.7239v-7.5158q-0.17363-0.94258-0.5333-1.9844-0.59531-1.7859-0.64492-1.9472l-2.3564-7.8507q0-0.0124 0-0.11162h1.7487l2.6665 9.711 2.6417-9.711h1.7363q0 0.08682 0 0.11162z" />
        <path className="st1" d="m78.699 33.173h-1.7115l-0.68213-4.316h-3.8571l-0.68213 4.316h-1.6619v-0.04961l3.4603-19.41h1.6991zm-2.6169-5.8415-1.6991-10.517-1.7115 10.517z" />
        <path className="st1" d="m89.043 33.173h-1.1906l-5.1842-14.275v14.275h-1.6247v-19.41h1.2898l5.085 14.027v-14.027h1.6247z" />
        <path className="st1" d="m93.979 33.173h-1.7239v-19.41h1.7239z" />
      </Anime>);
    } else return null;
  }

  render() {
    const { animationStatus } = this.state;
    return (
      <div>
        {animationStatus === 'out'
          ? <button onClick={() => this.setAnimationStatus('normal')}>animate in</button>
          : (animationStatus === 'in' ? <button onClick={() => this.setAnimationStatus('reverse')}>animate out</button> : null)
        }
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 140 50">
          {this.generateAnimation()}
        </svg>
      </div>
    )
  }
}

export default Title;