import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid, Row, Col, PageHeader, Image, Jumbotron } from 'react-bootstrap'

import './Styles/Bio.scss'

const footerLinks = [
  'facebook',
  'twitter',
  'instagram',
  'spotify',
  'youtube',
  'soundcloud'
]

const bioFooterElements = bioFooterLinks => footerLinks.map(link =>
  <div className="bio-footer-link" key={link}>
    <a href={bioFooterLinks[link]} className={link} target="_blank">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <FontAwesomeIcon icon={['fab', link]} />
      </svg>
    </a>
  </div>
)

const bioTextElement = bioFullText => bioFullText.map((snippet, i) => <p key={i} style={{ fontSize: "calc(0.45vw + 0.15vh + 10px)" }}>{snippet}</p>)

class Bio extends React.Component {
  constructor(props) {
    super(props)

    this.bioCircleRef = React.createRef()
    this.bioRef = React.createRef()
    this.bioInnerRef = React.createRef()

    this.footer = bioFooterElements(props.data.config.links)
    this.bioText = bioTextElement(props.data.bio.main.text)

    this.animateElements = this.animateElements.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.bioCircleRef.current)
    anime.remove(this.bioRef.current)
    anime.remove(this.bioInnerRef.current)

    // GROWING CIRCLE ANIMATION
    anime({
      targets: this.bioCircleRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scale: animate ? [0, 1] : [1, 0],
      delay: animate ? 0 : 200,
      duration: 1000
    })

    // ENTER MUSIC CONTAINER ANIMATION
    anime({
      targets: this.bioRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? ['-100vh', '0vh'] : ['0vh', '-100vh'],
      opacity: animate ? [0, 1] : [1, 0],
      delay: animate ? 400 : 200,
      duration: 500

    })

    // GROW MUSIC CONTAINER ANIMATION
    anime({
      targets: this.bioInnerRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      scaleX: animate ? [0, 1] : [1, 0],
      delay: animate ? 600 : 0,
      duration: 500
    })
  }

  render() {
    const { data, animate, setOrReset } = this.props
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
          <div ref={this.bioCircleRef} className="bio-circle" />
          <div ref={this.bioRef} className="bio-container">
            <div ref={this.bioInnerRef}>
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
                        <Col xs={6} md={8} lg={10}>BIO</Col>
                        <Col xs={3} md={2} lg={1}></Col>
                      </Row>
                    </PageHeader>
                    <Jumbotron style={{ backgroundColor: "#5e7fba" }}>
                      <Row>
                        <Col xs={12} sm={4} md={3} lg={2} style={{ marginBottom: "20px" }}>
                          <Image src={`${process.env.PUBLIC_URL}/data/${data.bio.blurb.image}`} responsive circle />
                        </Col>
                        <Col xs={12} sm={8} md={9} lg={10}>
                          <p className="blurb-text" style={{ fontSize: "calc(0.35vw + 0.15vh + 15px)", textAlign:"left" }}>{data.bio.blurb.text}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12} lg={12}>
                          <em className="blurb-footer" style={{ fontSize: "calc(0.35vw + 0.15vh + 15px)", textAlign:"left" }}>{data.bio.blurb.footer}</em>
                        </Col>
                      </Row>
                    </Jumbotron>
                    <Row>
                      <Col xs={12} md={6} lg={8}>
                        <div className="bio-text">
                          {this.bioText}
                        </div>
                      </Col>
                      <Col xs={12} md={6} lg={4}>
                        <Image src={`${process.env.PUBLIC_URL}/data/${data.bio.main.image}`} responsive />
                      </Col>
                    </Row>
                    <div className="bio-footer">
                      {this.footer}
                    </div>
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </Transition >
    )
  }
}

export default Bio