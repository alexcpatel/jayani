import React from "react";
import { Transition } from "react-transition-group";
import anime from "animejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Glyphicon,
  OverlayTrigger,
  Popover,
  ProgressBar
} from "react-bootstrap";
import EmailValidator from "email-validator";
import { subscribeToNewsletter } from "./SubscribeToNewsletter";

import "./Styles/Contact.scss";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      email: null,
      validateStatus: null,
      emailNow: 0,
      loading: false,
      emailStatus: null
    };

    this.emailRef = React.createRef();
    this.envelopeRef = React.createRef();

    this.setOrReset = this.setOrReset.bind(this);
    this.animateElements = this.animateElements.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.incrementLoading = this.incrementLoading.bind(this);
  }

  setOrReset() {
    this.setState(prevState => ({
      animate: !prevState.animate
    }));
  }

  animateElements(animate) {
    anime.remove(this.emailRef.current);
    anime.remove(this.envelopeRef.current);

    anime({
      targets: this.envelopeRef.current,
      easing: "easeInOutQuart",
      loop: false,
      translateX: animate ? [0, -160] : [-160, 0],
      delay: animate ? 0 : 200,
      duration: 400
    });

    anime({
      targets: this.emailRef.current,
      easing: "easeInOutQuart",
      loop: false,
      opacity: animate ? [0, 1] : [1, 0],
      delay: animate ? 200 : 0,
      duration: 400
    });
  }

  handleChange(event) {
    if (this.state.validateStatus) {
      this.setState({ validateStatus: null });
    }
    this.setState({ email: event.target.value });
  }

  handleUpdate(event) {
    event.preventDefault();
    const email = this.state.email;
    if (EmailValidator.validate(email) && !this.state.loading) {
      this.sendEmail(email);
    } else {
      this.setState({ validateStatus: "error" });
      setTimeout(() => this.setState({ validateStatus: null }), 1500);
    }
  }

  sendEmail(email) {
    (async email => {
      try {
        this.refs.emailPopover.show();
        this.startLoading();
        await subscribeToNewsletter({ email });
        this.setState({
          loading: false,
          emailNow: 100,
          validateStatus: "success",
          emailStatus: "success"
        });
        setTimeout(() => this.setState({ validateStatus: null }), 1500);
        setTimeout(() => {
          this.setState({ emailStatus: null });
          this.refs.emailPopover.hide();
        }, 1500);
      } catch (err) {
        this.setState({
          loading: false,
          emailNow: 0,
          validateStatus: "error",
          emailStatus: err
        });
        setTimeout(() => this.setState({ validateStatus: null }), 1500);
        setTimeout(() => {
          this.setState({ emailStatus: null });
          this.refs.emailPopover.hide();
        }, 1500);
      }
    })(email);
  }

  startLoading() {
    this.setState({ emailNow: 0, loading: true });
    setTimeout(this.incrementLoading, 50);
  }

  incrementLoading() {
    this.setState(prevState => ({
      emailNow: prevState.emailNow + Math.floor(Math.random() * 10) + 1
    }));
    if (this.state.emailNow < 85 && this.state.loading) {
      setTimeout(
        () => this.incrementLoading(),
        Math.floor(Math.random() * 100) + 10
      );
    }
  }

  render() {
    const {
      animate,
      validateStatus,
      emailNow,
      emailStatus,
      loading
    } = this.state;
    return (
      <div>
        <Transition
          in={animate}
          mountOnEnter
          unmountOnExit
          duration={1000}
          timeout={1000}
          onEnter={() => {
            this.animateElements(animate);
          }}
          onExit={() => {
            this.animateElements(animate);
          }}
        >
          <div ref={this.emailRef} className="contact-info">
            <h3 style={{ height: "33px" }}>Don't miss a beat!</h3>
            <Form
              inline
              style={{
                textAlign: "right",
                marginBottom: "10px",
                marginRight: "40px"
              }}
              onSubmit={this.handleUpdate}
            >
              <div
                style={{
                  width: "280px",
                  marginLeft: "95px",
                  marginTop: "-4px"
                }}
              >
                <div style={{ width: "180px", display: "inline-block" }}>
                  <FormGroup
                    controlId="formInlineEmail"
                    validationState={validateStatus}
                  >
                    <FormControl
                      style={{ width: "180px" }}
                      type="email"
                      placeholder="your email"
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback>
                      {validateStatus === "success" ? (
                        <Glyphicon glyph="music" />
                      ) : validateStatus === "error" ? (
                        <Glyphicon glyph="remove" />
                      ) : null}
                    </FormControl.Feedback>
                  </FormGroup>
                </div>
                <div
                  style={{
                    marginLeft: "5px",
                    width: "95px",
                    display: "inline-block"
                  }}
                >
                  <OverlayTrigger
                    ref="emailPopover"
                    trigger={null}
                    placement="top"
                    overlay={
                      <Popover
                        id="popover-positioned-top"
                        title="Subscribing..."
                        style={{ width: "40vw" }}
                      >
                        <ProgressBar active now={emailNow} />
                        {emailStatus
                          ? emailStatus === "success" && !loading
                            ? "You are now subscribed!"
                            : `Whoops! We got the following error: ${emailStatus}`
                          : ""}
                      </Popover>
                    }
                  >
                    <Button
                      type="submit"
                      style={{
                        width: "95px"
                      }}
                    >
                      Subscribe
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </Form>
            <p
              style={{
                overflow: "visible",
                whiteSpace: "nowrap",
                textAlign: "center"
              }}
            >
              Join my mailing list to stay updated ~ <br /> Feel free to contact
              me via my socials <br /> For business inquiries:{" "}
              <em>jayanimusic@gmail.com</em>
            </p>
          </div>
        </Transition>
        <div
          className="envelope"
          ref={this.envelopeRef}
          onClick={this.setOrReset}
        >
          <svg
            className="hover-scale"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <FontAwesomeIcon id="envelope-icon" icon={faEnvelope} />
          </svg>
        </div>
      </div>
    );
  }
}

export default Contact;
