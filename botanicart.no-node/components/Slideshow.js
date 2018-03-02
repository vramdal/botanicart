import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Slideshow extends Component {


    constructor() {
        super();
        this.state = {currentImageIdx: 0};
    }

    componentDidMount() {
        this.slideshowElement.addEventListener("transitionend", (evt) => {
            console.log("transitionend", evt.target, window.getComputedStyle(evt.target).opacity);
            if (window.getComputedStyle(evt.target).opacity === "1") {
                evt.target.classList.add("visibleSlide");
                evt.target.classList.remove("invisibleSlide");
                evt.target.classList.remove("fadein");
            }
        }, true);
        window.setTimeout(() => {
            this.currentSlideElement.classList.add("fadein");
        }, 200);

    }

    render() {
        return (<div className={classnames("slideshow")} ref={el => this.slideshowElement = el}>
            {this.props.children.map((child, idx) =>
                <div className={classnames("slide", {"invisibleSlide": this.state.currentImageIdx !== idx})}
                    key={"slide-" + idx}
                     ref={(ref) => {if (this.state.currentImageIdx === idx) this.currentSlideElement = ref}}
                >
                    {child}
                </div>)}
            <style jsx>{`
            .slideshow {
               display: flex;
               flex-direction: column;
               align-items: center;
            }

            .slide {
              opacity: 0;
            }

            .invisibleSlide {
              opacity: 0;
            }

            .visibleSlide {
              opacity: 1;
            }

            .slide.fadeout {
                transition-property: opacity;
                transition-duration: 1s;
                transition-delay: 0s;
                transition-timing-function: ease-out;
                opacity: 0;
                }

            .slide.fadein {
                transition-property: opacity;
                transition-duration: 3s;
                transition-delay: 0s;
                transition-timing-function: ease-in;
                opacity: 1;
            }

            .slide.hidden {
               display: none;
            }
            `}</style>
        </div>);
    }
}

Slideshow.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
/*
    fadeInClassName: PropTypes.string.isRequired,
    fadeOutClassName: PropTypes.string.isRequired,
*/
    displayMs: PropTypes.number.isRequired,
    running: PropTypes.bool.isRequired
};

Slideshow.defaultProps = {
    running: true,
    displayMs: 2000
};