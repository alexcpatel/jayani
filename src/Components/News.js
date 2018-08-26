import React from "react";
import { Transition } from "react-transition-group";
import anime from "animejs";
import { Document, Page } from "react-pdf";

import "./Styles/News.scss";

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = { animate: false, animateBorder: false };

    this.newsRef = React.createRef();
    this.newsButtonBorderRef = React.createRef();

    this.setOrReset = this.setOrReset.bind(this);
    this.animateElements = this.animateElements.bind(this);
    this.animateNewsButtonBorder = this.animateNewsButtonBorder.bind(this);
  }

  setOrReset() {
    this.setState(prevState => ({
      animate: !prevState.animate
    }));
  }

  animateElements(animate) {
    anime.remove(this.newsRef.current);

    anime({
      targets: this.newsRef.current,
      easing: "easeInOutQuart",
      loop: false,
      translateY: animate ? [500, 0] : [0, 500],
      opacity: animate ? [0, 1] : [1, 0],
      delay: 0,
      duration: 500
    });
  }

  animateNewsButtonBorder() {
    anime({
      targets: this.newsButtonBorderRef.current.querySelectorAll(
        ".news-button-border-path"
      ),
      easing: "easeInOutSine",
      delay: 0,
      duration: 3000,
      loop: true,
      direction: "alternate",
      strokeDashoffset: el => {
        var pathLength = 0;
        if (el.getTotalLength) {
          pathLength = el.getTotalLength();
          el.setAttribute("stroke-dasharray", pathLength);
        }
        return [pathLength, 0];
      }
    });
  }

  componentDidMount() {
    this.setState({ animateBorder: true });
  }

  render() {
    const { animate, animateBorder } = this.state;
    const { dataPath } = this.props;
    return (
      <div>
        <Transition
          in={animateBorder}
          duration={2000}
          timeout={2000}
          onEnter={this.animateNewsButtonBorder}
          onExit={this.animateNewsButtonBorder}
        >
          <div
            className="news-button hover-scale-light"
            style={{
              backgroundImage: `url("${dataPath}${
                this.props.data.news.button
              }")`
            }}
            onClick={this.setOrReset}
          >
            <svg
              ref={this.newsButtonBorderRef}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="1 1 80 20"
            >
              <path
                className="news-button-border-path"
                d="M 1.3435885,1.2557672 H 80.718584 V 19.549227"
              />
              <path
                className="news-button-border-path"
                d="M 80.718584,19.549227 H 1.3435885 V 1.2557672"
              />
            </svg>
          </div>
        </Transition>
        <Transition
          in={animate}
          mountOnEnter
          unmountOnExit
          duration={500}
          timeout={500}
          onEnter={() => {
            this.animateElements(animate);
          }}
          onExit={() => {
            this.animateElements(animate);
          }}
        >
          <div>
            <div ref={this.newsRef} className="pdf">
              <Document
                width="612px"
                file={`${dataPath}${this.props.data.news.pdf}`}
              >
                <Page pageNumber={1} />
              </Document>
            </div>
            {animate ? (
              <div className="pdf-overlay" onClick={this.setOrReset} />
            ) : null}
          </div>
        </Transition>
      </div>
    );
  }
}

export default News;
