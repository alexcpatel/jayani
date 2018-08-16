import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap'
import Iframe from 'react-iframe'

import './Styles/Music.scss'

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

const footerLinks = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const musicFooterElements = musicFooterLinks => footerLinks.map(link =>
  <div className="music-footer-link" key={link}>
    <a href={musicFooterLinks[link]} className={link} target="_blank">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>
    </a>
  </div>
)

const linkElements = musicLinks => links.map(link =>
  <a href={musicLinks[link]} target="_blank" key={link}>
    {link === 'tidal' ? <img className="music-link-image" src={tidalImgPath} alt="Tidal" /> : (link === 'deezer' ? <img className="music-link-image" src={deezerImgPath} alt="Tidal" /> :
      <svg className="music-link-image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>)}
  </a>
)

const musicElements = musicList => musicList.map(music =>
  <Panel key={music.name}>
    <Panel.Heading><Panel.Title><p style={{ fontSize: '1.5em' }}>{music.name}</p></Panel.Title></Panel.Heading>
    <Panel.Body>
      <Row>
        <Col xs={12} md={4} lg={4}>
          <img src={`${process.env.PUBLIC_URL}/data${music.image}`} alt={music.name} style={{ width: '100%', height: 'auto' }} />
          <div className="music-link-container">
            {linkElements(music.links)}
          </div>
        </Col>
        <Col xs={12} md={8} lg={8}>
          <Iframe url={music.spotify} position='relative' width="100%" height="400px" frameborder="0" allowtransparency="true" allow="encrypted-media" />
        </Col>
      </Row>
    </Panel.Body>
  </Panel >
)

class Music extends React.Component {
  constructor(props) {
    super(props)

    this.musicCircleRef = React.createRef()
    this.musicRef = React.createRef()
    this.musicInnerRef = React.createRef()

    this.music = musicElements(props.data.music)
    this.footer = musicFooterElements(props.data.config.links)

    this.animateElements = this.animateElements.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.musicCircleRef.current)
    anime.remove(this.musicRef.current)
    anime.remove(this.musicInnerRef.current)

    // GROWING CIRCLE ANIMATION
    anime({
      targets: this.musicCircleRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? [0, 1] : [1, 0],
      delay: animate ? 0 : 200,
      duration: 1000
    })

    // ENTER MUSIC CONTAINER ANIMATION
    anime({
      targets: this.musicRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? ['-100vh', '0vh'] : ['0vh', '-100vh'],
      opacity: animate ? [0, 1] : [1, 0],
      delay: animate ? 400 : 200,
      duration: 500

    })

    // GROW MUSIC CONTAINER ANIMATION
    anime({
      targets: this.musicInnerRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scaleX: animate ? [0, 1] : [1, 0],
      delay: animate ? 600 : 0,
      duration: 500
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
            <div ref={this.musicInnerRef}>
              <Grid>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <PageHeader>
                      <Row>
                        <Col xs={3} md={2} lg={1}>
                          <Button variant="fab" color="primary" aria-label="Add" onClick={() => { if (animate) setOrReset() }}>
                            <UpIcon />
                          </Button>
                        </Col>
                        <Col xs={6} md={8} lg={10}>MUSIC</Col>
                        <Col xs={3} md={2} lg={1}></Col>
                      </Row>
                    </PageHeader>
                    <Panel>
                      <Panel.Heading>Jayani Tunes</Panel.Heading>
                      <Panel.Body>Coming Soon!</Panel.Body>
                    </Panel>
                    {this.music}
                    <div className="music-footer">
                      {this.footer}
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </Transition>
    )
  }
}

export default Music