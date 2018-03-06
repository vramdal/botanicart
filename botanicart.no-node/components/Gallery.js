import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from "next/link";

export default class Gallery extends Component {


    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
    }

    render() {
        return (<ul className={classnames("gallery", this.props.className)} ref={el => this._root = el} style={this.props.style}>
            {this.props.frames.map((frame, idx) =>
                <li id={`frame-${frame.key}`} className={classnames("gallery-image-holder", this.props.framesClassName)} key={"frame-" + idx}
                >
                    <a href={`#frame-${frame.key}`} key={`link-${frame.key}`}>
                        {frame}
                    </a>
                    <div className="gallery-image-fullsize-holder">
                        <img src="https://lh3.googleusercontent.com/-UCNCsoIsbps/UDvqoWoZs_I/AAAAAAAARZM/rTTBnwD0rO4xXSFGexLVjxZj7FT0sYzbwCHMYBhgL/s800/gulteple.png"
                             alt="Malus - gult eple"/>
                        <br/>
                        <span className="gallery-image-fullsize-caption">Malus - gult eple</span>
                    </div>
                </li>)}
            {this.props.children}
            <style jsx>{`
            .gallery-image-holder:target {
               border: 2px solid red !important;
            }
            `}</style>
        </ul>);
    }
}

Gallery.propTypes = {
    frames: PropTypes.arrayOf(PropTypes.element),
    children: PropTypes.any,
    className: PropTypes.string,
    framesClassName: PropTypes.string,
    style: PropTypes.object,
    onGalleryFrameSelect: PropTypes.func
};

Gallery.defaultProps = {
};