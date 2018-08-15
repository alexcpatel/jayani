import React from 'react'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap'
import EmailValidator from 'email-validator'

import './Contact.scss'

import { jayaniEmail } from './Data/Data'

class Contact extends React.Component {
  constructor(props) {
    super(props)

    this.state = { animate: false, email: null, validateStatus: null }

    this.emailRef = React.createRef()
    this.envelopeRef = React.createRef()

    this.setOrReset = this.setOrReset.bind(this)
    this.animateElements = this.animateElements.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  setOrReset() {
    this.setState(prevState => ({
      animate: !prevState.animate
    }));
  }

  animateElements(animate) {
    anime.remove(this.emailRef.current)
    anime.remove(this.envelopeRef.current)

    anime({
      targets: this.envelopeRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateX: animate ? [0, -160] : [-160, 0],
      delay: animate ? 0 : 200,
      duration: 400
    })

    anime({
      targets: this.emailRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      opacity: animate ? [0, 1] : [1, 0],
      delay: animate ? 200 : 0,
      duration: 400
    })
  }

  handleChange(event) {
    if (this.state.validateStatus) { this.setState({ validateStatus: null }) }
    this.setState({ email: event.target.value })
  }

  handleUpdate(event) {
    event.preventDefault()
    const email = this.state.email
    if (EmailValidator.validate(email)) {
      console.log(email)
      this.setState({ validateStatus: "success" })
    } else {
      this.setState({ validateStatus: "error" })
    }
  }

  render() {
    const { animate, validateStatus } = this.state
    return (
      <div>
        <Transition
          in={animate}
          mountOnEnter
          unmountOnExit
          duration={1000}
          timeout={1000}
          onEnter={() => { this.animateElements(animate) }}
          onExit={() => { this.animateElements(animate) }}>
          <div ref={this.emailRef} className="contact-info">
            <h3 style={{ height: "33px" }}>Don't miss a beat!</h3>
            <Form inline style={{ textAlign: "right", marginBottom: "20px", marginRight: "40px" }} onSubmit={this.handleUpdate}>
              <Row>
                <Col xs={3} />
                <Col xs={7}>
                  <FormGroup controlId="formInlineEmail" validationState={validateStatus}>
                    <FormControl type="email" placeholder="your email" onChange={this.handleChange} />
                    <FormControl.Feedback>
                      {validateStatus === "success" ? <Glyphicon glyph="music" /> : (validateStatus === "error" ? <Glyphicon glyph="remove" /> : null)}
                    </FormControl.Feedback>
                  </FormGroup>
                </Col>
                <Col xs={2}>
                  <Button type="submit">Subscribe</Button>
                </Col>
              </Row>
            </Form>
            <p> Join my mailing list to stay updated ~ <br /> Feel free to contact me via my socials <br /> For business inquiries: <em>{jayaniEmail}</em></p>
          </div>
        </Transition>
        <div className="envelope" ref={this.envelopeRef} onClick={this.setOrReset}>
          <svg className="hover-scale" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <FontAwesomeIcon id="envelope-icon" icon={faEnvelope} />
          </svg>
        </div>
      </div>
    )
  }
}

export default Contact