import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap'

import './Events.scss'

import { hyperlinks } from './Data/Data'

const footerLinks = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const eventsFooterLinks = footerLinks.map(link =>
  <div className="events-footer-link" key={link}>
    <a href={hyperlinks[link]} className={link} target="_blank">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>
    </a>
  </div>
)

class Events extends React.Component {
  constructor(props) {
    super(props)

    this.eventsCircleRef = React.createRef()
    this.eventsRef = React.createRef()
    this.eventsInnerRef = React.createRef()

    this.animateElements = this.animateElements.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.eventsCircleRef.current)
    anime.remove(this.eventsRef.current)
    anime.remove(this.eventsInnerRef.current)

    // GROWING CIRCLE ANIMATION
    anime({
      targets: this.eventsCircleRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? [0, 1] : [1, 0],
      delay: animate ? 0 : 200,
      duration: 1000
    })

    // ENTER MUSIC CONTAINER ANIMATION
    anime({
      targets: this.eventsRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? ['-100vh', '0vh'] : ['0vh', '-100vh'],
      opacity: animate ? [0,1] : [1,0],
      delay: animate ? 400 : 200,
      duration: 500

    })

    // GROW MUSIC CONTAINER ANIMATION
    anime({
      targets: this.eventsInnerRef.current,
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
          <div ref={this.eventsCircleRef} className="events-circle" />
          <div ref={this.eventsRef} className="events-container">
            <div ref={this.eventsInnerRef}>
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
                        <Col xs={6} md={8} lg={10}>EVENTS</Col>
                        <Col xs={3} md={2} lg={1}></Col>
                      </Row>
                    </PageHeader>
                    <Panel>
                      <Panel.Heading>Upcoming Events</Panel.Heading>
                      <Panel.Body>Coming Soon!</Panel.Body>
                    </Panel>
                    <div className="events-footer">
                      {eventsFooterLinks}
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

export default Events