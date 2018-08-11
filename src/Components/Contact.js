import React from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './Contact.scss'

import { email } from './Data/Data'

class Contact extends React.Component {
  constructor(props) {
    super(props)

    this.state = { animate: false }

    this.contactSubmitRef = React.createRef()
    this.contactInfoRef = React.createRef()
    this.envelopeRef = React.createRef()

    this.setOrReset = this.setOrReset.bind(this)
    this.animateElements = this.animateElements.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  animateElements(animate) {
    anime.remove(this.contactInfoRef.current)
    anime.remove(this.contactSubmitRef.current)
    anime.remove(this.envelopeRef.current)

    anime({
      targets: this.envelopeRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateX: animate ? [0, -150] : [-150, 0],
      delay: 0,
      duration: 500
    })

    anime({
      targets: this.contactSubmitRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      translateY: animate ? [250, 0] : [0, 250],
      opacity: animate ? [0, 1] : [1, 0],
      delay: 0,
      duration: 500
    })

    anime({
      targets: this.contactInfoRef.current,
      easing: 'easeInOutQuart',
      loop: false,
      opacity: animate ? [0, 0.6] : [0.6, 0],
      delay: 0,
      duration: 500
    })
  }

  setOrReset() {
    this.setState(prevState => ({
      animate: !prevState.animate
    }));
  }

  handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  handleSubmit = () => {
    if (this.state.email) {
      console.log(this.state.email)
    }
  }

  render() {
    const { animate, email } = this.state
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
          <div>
            <div className="contact-info" ref={this.contactInfoRef}>
              <h2 className="contact-info-text"> Don't miss a beat! </h2>
              <p className="contact-info-text contact-info-footer"> Join my mailing list to stay updated ~ <br/> Feel free to contact me via my socials <br/> For business inquiries: <em>jayanitunes@gmail.com</em></p>
            </div>
            <div className="contact-submit" ref={this.contactSubmitRef}>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
              >
                <TextValidator
                  label="Email"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                  style={{ marginRight: "5px" }}
                />
                <Button type="submit">Submit</Button>
              </ValidatorForm>
            </div>
          </div>
        </Transition>
        <div className="envelope" ref={this.envelopeRef} onClick={this.setOrReset}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <FontAwesomeIcon id="envelope-icon" icon={faEnvelope} />
          </svg>
        </div>
      </div>
    )
  }
}

export default Contact