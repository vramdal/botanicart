import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
                <li className={classnames("gallery-image-holder", this.props.framesClassName)} key={"frame-" + idx}>
                    {frame}
                </li>)}
            {this.props.children}
            <style jsx>{`
            `}</style>
        </ul>);
    }
}

Gallery.propTypes = {
    frames: PropTypes.arrayOf(PropTypes.element),
    children: PropTypes.any,
    className: PropTypes.string,
    framesClassName: PropTypes.string,
    style: PropTypes.object
};

Gallery.defaultProps = {
};