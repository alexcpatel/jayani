import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Row, Col, Panel, PanelGroup, PageHeader, Modal, Button as ModalButton } from 'react-bootstrap'
import { DateTime } from 'luxon'
import timezoner from 'timezoner'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import './Styles/Events.scss'

const footerLinks = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const eventsFooterElements = eventsFooterLinks => footerLinks.map(link =>
  <div className="events-footer-link" key={link}>
    <a href={eventsFooterLinks[link]} className={link} target="_blank">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>
    </a>
  </div>
)

const currentTime = DateTime.local()

const compareEventTimes = (a, b) => {
  if (a.time[0] < b.time[0])
    return 1;
  if (a.time[0] > b.time[0])
    return -1;
  return 0;
}

const addTimeToEvents = rawEvents => {
  let events = {}
  const updatedEvents = []
  let eventsRemaining = events.length

  const callback = event => (err, data) => {
    const zone = err ? "America/Los_Angeles" : data.timeZoneId
    const timezone = err ? "Pacific Standard Time" : data.timeZoneName
    updatedEvents.push(Object.assign(event, { timezone, time: [DateTime.fromISO(event.date[0], { zone }), DateTime.fromISO(event.date[1], { zone })] }))
    eventsRemaining--
    if (!eventsRemaining) {
      events.pastEvents = updatedEvents.filter(event => event.time[0] < currentTime).sort(compareEventTimes)
      events.upcomingEvents = updatedEvents.filter(event => event.time[0] >= currentTime).sort(compareEventTimes)
    }
  }

  for (let i = 0; i < rawEvents.length; i++) {
    const event = rawEvents[i]
    timezoner.getTimeZone(event.coordinates[0], event.coordinates[1], callback(event))
  }

  return events
}

const generateUpcomingEventElements = events => events.map((event, i) => {
  const MapComponent = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: event.coordinates[0], lng: event.coordinates[1] }}>
      <Marker position={{ lat: event.coordinates[0], lng: event.coordinates[1] }} />
    </GoogleMap>))
  return (
    <Panel key={i + 1}>
      <Panel.Heading>
        <Panel.Title>
          <Row className="row-eq-height">
            <Col xs={3} md={2} lg={2}>
              <img src={`${process.env.PUBLIC_URL}/data${event.icon}`} alt={event.name} style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col className="upcoming-events-text" sm={3} md={2} lg={2}>{event.name}</Col>
            <Col className="upcoming-events-text" sm={3} md={2} lg={2}>{event.address}</Col>
            <Col className="upcoming-events-text" sm={3} md={6} lg={6}>
              <p>
                {event.time[0].toLocaleString(DateTime.DATE_HUGE)},{' '}
                {event.time[0].toLocaleString(DateTime.TIME_SIMPLE)}
                <br /> to <br />
                {event.time[1].toLocaleString(DateTime.DATE_HUGE)},{' '}
                {event.time[1].toLocaleString(DateTime.TIME_SIMPLE)} {' '}
                {event.time[1].offsetNameShort}
              </p>
            </Col>
          </Row>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row className="row-eq-height">
          <Col xs={6} md={4} lg={3}>
            <img src={`${process.env.PUBLIC_URL}/data${event.image}`} alt={event.name} style={{ width: '100%', height: 'auto' }} />
          </Col>
          <Col className="upcoming-events-description" xs={6} md={8} lg={3}>
            {event.description}
          </Col>
          <Col xs={12} md={12} lg={6}>
            <MapComponent
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAg1Gbx26rI7zXOGcvEXbg0w2Yg8_eyf1g&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />} />
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
})

const generatePastEventElements = events => events.map((event, i) =>
  <Panel eventKey={i + 1} key={i + 1}>
    <Panel.Heading>
      <Panel.Title toggle>
        <Row className="row-eq-height">
          <Col xs={3} md={2} lg={1}>
            <img src={`${process.env.PUBLIC_URL}/data${event.icon}`} alt={event.name} style={{ width: '100%', height: 'auto' }} />
          </Col>
          <Col className="past-events-text" sm={3} md={4} lg={5}>{event.name}</Col>
          <Col className="past-events-text" sm={3} md={3} lg={3}>{event.address}</Col>
          <Col className="past-events-text" sm={3} md={3} lg={3}>{event.time[0].toLocaleString(DateTime.DATE_FULL)}</Col>
        </Row>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body collapsible>
      <Row className="row-eq-height">
        <Col sm={6} md={4} lg={3}>
          <img src={`${process.env.PUBLIC_URL}/data${event.image}`} alt={event.name} style={{ width: '100%', height: 'auto' }} />
        </Col>
        <Col className="past-events-description" sm={6} md={8} lg={9}>
          {event.description}
        </Col>
      </Row>
    </Panel.Body>
  </Panel>
)

class Events extends React.Component {
  constructor(props) {
    super(props)

    this.eventsCircleRef = React.createRef()
    this.eventsRef = React.createRef()
    this.eventsInnerRef = React.createRef()

    this.events = addTimeToEvents(props.data.events)
    this.footer = eventsFooterElements(props.data.config.links)

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.animateElements = this.animateElements.bind(this)
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
      opacity: animate ? [0, 1] : [1, 0],
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
                  <Col sm={12} md={12} lg={12}>
                    <PageHeader>
                      <Row>
                        <Col sm={3} md={2} lg={1}>
                          <Button variant="fab" color="primary" aria-label="Add" onClick={() => { if (animate) setOrReset() }}>
                            <UpIcon />
                          </Button>
                        </Col>
                        <Col sm={6} md={8} lg={10}>EVENTS</Col>
                        <Col sm={3} md={2} lg={1}></Col>
                      </Row>
                    </PageHeader>
                    {this.events.upcomingEvents && generateUpcomingEventElements(this.events.upcomingEvents)}
                    <ModalButton bsSize="large" onClick={this.handleShow}>
                      View Past Events
                    </ModalButton>
                    <Modal className="past-events" dialogClassName="past-events-modal" show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Past Events</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <PanelGroup accordion id="past-events-panel-group" defaultActiveKey={null}>
                          {this.events.pastEvents && generatePastEventElements(this.events.pastEvents)}
                        </PanelGroup>
                      </Modal.Body>
                      <Modal.Footer>
                        <ModalButton onClick={this.handleClose}>Close</ModalButton>
                      </Modal.Footer>
                    </Modal>
                    <div className="events-footer">
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

export default Events