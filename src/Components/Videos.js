import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Row, Col, Carousel, PageHeader, ResponsiveEmbed } from 'react-bootstrap'
import Iframe from 'react-iframe'

import './Videos.scss'

import { hyperlinks, youtubeLinks } from './Data/Data'

const footerLinks = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const videosFooterLinks = footerLinks.map(link =>
  <div className="videos-footer-link" key={link}>
    <a href={hyperlinks[link]} className={link} target="_blank">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>
    </a>
  </div>
)

const youtubeVideos = youtubeLinks.map(link =>
  <Carousel.Item animateOut={true} animtateIn={true} key={link}>
    <ResponsiveEmbed a16by9>
      <Iframe url={link} allow="encrypted-media" />
    </ResponsiveEmbed>
  </Carousel.Item>
)

class Videos extends React.Component {
  constructor(props) {
    super(props)

    this.videosCircleRef = React.createRef()
    this.videosRef = React.createRef()
    this.videosInnerRef = React.createRef()

    this.animateElements = this.animateElements.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.videosCircleRef.current)
    anime.remove(this.videosRef.current)
    anime.remove(this.videosInnerRef.current)

    // GROWING CIRCLE ANIMATION
    anime({
      targets: this.videosCircleRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? [0, 1] : [1, 0],
      delay: animate ? 0 : 200,
      duration: 1000
    })

    // ENTER MUSIC CONTAINER ANIMATION
    anime({
      targets: this.videosRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? ['-100vh', '0vh'] : ['0vh', '-100vh'],
      opacity: animate ? [0, 1] : [1, 0],
      delay: animate ? 400 : 200,
      duration: 500

    })

    // GROW MUSIC CONTAINER ANIMATION
    anime({
      targets: this.videosInnerRef.current,
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
          <div ref={this.videosCircleRef} className="videos-circle" />
          <div ref={this.videosRef} className="videos-container">
            <div ref={this.videosInnerRef}>
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
                        <Col xs={6} md={8} lg={10}>VIDEOS</Col>
                        <Col xs={3} md={2} lg={1}></Col>
                      </Row>
                    </PageHeader>
                    <Carousel interval={null} indicators={false}>
                      {youtubeVideos}
                    </Carousel>
                    <div className="videos-footer">
                      {videosFooterLinks}
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

export default Videos