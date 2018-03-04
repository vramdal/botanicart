import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Slideshow extends Component {


    constructor() {
        super();
        this.state = {currentImageIdx: 0};
    }

    componentDidMount() {
        this.eventListener = this._root.addEventListener("transitionend", (evt) => {
            console.log("transitionend", evt.target, window.getComputedStyle(evt.target).opacity, this.state.currentImageIdx);
            if (window.getComputedStyle(evt.target).opacity === "1") {
                evt.target.classList.add("visibleSlide");
                evt.target.classList.remove("invisibleSlide");
                evt.target.classList.remove("fadein");
                evt.target.classList.add("fadeout");
            }
            if (window.getComputedStyle(evt.target).opacity === "0") {
                evt.target.classList.add("invisibleSlide");
                evt.target.classList.remove("visibleSlide");
                evt.target.classList.remove("fadeout");
                let numSlides = this._root.querySelectorAll(".slide").length;
                let nyCurrentImageIdx = (this.state.currentImageIdx + 1 >= numSlides) ? 0 : this.state.currentImageIdx + 1;
                this.setState({currentImageIdx: (nyCurrentImageIdx)});
            }
        }, true);
        window.setTimeout(() => {
            this.currentSlideElement.classList.add("fadein");
        }, 1);

    }

    //noinspection JSUnusedLocalSymbols
    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentImageIdx !== this.state.currentImageIdx) {
            this.currentSlideElement.classList.add("fadein");
        }

    }

    componentWillUnmount() {
        this._root.removeEventListener("transitionend", this.eventListener);
    }

    render() {
        return (<div className={classnames("slideshow", this.props.className)} ref={el => this._root = el} style={this.props.style}>
            {this.props.slides.map((child, idx) =>
                <div className={classnames("slide", this.props.slidesClassName, {"invisibleSlide": this.state.currentImageIdx !== idx})}
                     key={"slide-" + idx}
                     ref={(ref) => {if (this.state.currentImageIdx === idx) this.currentSlideElement = ref}}
                >
                    {child}
                </div>)}
            {this.props.children}
            <style jsx>{`
            .slideshow {
            }

            .slide {
              opacity: 0;
            }

            .invisibleSlide {
              opacity: 0;
              position: absolute;
            }

            .visibleSlide {
              opacity: 1;
            }

            .slide.fadeout {
                transition-property: opacity;
                transition-duration: ${this.props.fadeOutMs}ms;
                transition-delay: ${this.props.displayMs}ms;
                transition-timing-function: ease-out;
                opacity: 0;
                }

            .slide.fadein {
                transition-property: opacity;
                transition-duration: ${this.props.fadeInMs}ms;
                transition-delay: 0s;
                transition-timing-function: ease-in;
                opacity: 1;
            }
            `}</style>
        </div>);
    }
}

Slideshow.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.element),
    children: PropTypes.any,
    fadeInMs: PropTypes.number.isRequired,
    fadeOutMs: PropTypes.number.isRequired,
    displayMs: PropTypes.number.isRequired,
    running: PropTypes.bool.isRequired,
    className: PropTypes.string,
    slidesClassName: PropTypes.string,
    style: PropTypes.object
};

Slideshow.defaultProps = {
    running: true,
    displayMs: 2000,
    fadeInMs: 1000,
    fadeOutMs: 1000
};