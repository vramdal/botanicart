import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import imageUrlBuilder from '@sanity/image-url'
import santiyClient from '../lib/sanity';
const builder = imageUrlBuilder(santiyClient);

export default class Lightbox extends React.Component {

    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        this.keyEventHandler = window.addEventListener("keyup", this.handleKey, true);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKey, true);
    }

    handleKey(evt) {
        if (this.props.open) {
            if (evt.key === "ArrowRight") {
                this.props.onNavigateRequested(+1);
            } else if (evt.key === "ArrowLeft") {
                this.props.onNavigateRequested(-1);
            } else if (evt.key === "Escape") {
                this.props.onCloseRequested();
            }
        }
    }

    render() {
        return this.props.open && (
            <div className={classnames('lightbox-content')}>
                <div className={'lightbox-controls lightbox-controls-left'}>
                    <span className={'button'} onClick={() => this.props.onNavigateRequested(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="20"
                             height="34">
                            <path d="m 19,3 -2,-2 -16,16 16,16 1,-1 -15,-15 15,-15 z"/>
                        </svg>
                    </span>
                </div>
                <div className={'lightbox-center-column'}>

                    <div className={'lightbox-controls lightbox-controls-row'}>
                        <div className={'close-button'} onClick={this.props.onCloseRequested}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="m 1,3 1.25,-1.25 7.5,7.5 7.5,-7.5 1.25,1.25 -7.5,7.5 7.5,7.5 -1.25,1.25 -7.5,-7.5 -7.5,7.5 -1.25,-1.25 7.5,-7.5 -7.5,-7.5 z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <img key={this.props.bilde._id} src={builder.image(this.props.bilde.image).url()} onClick={this.props.onCloseRequested}/>
                    </div>
                    <p className={"lightbox-image-caption"}>{this.props.bilde.name}
                        <span className="latin">{this.props.bilde.latin && (` (${this.props.bilde.latin})`)}</span>
                    </p>
                    <div className='lightbox-controls lightbox-controls-bottom'>
                    </div>
                </div>
                <div className={'lightbox-controls lightbox-controls-right'}>
                    <span className={'button'} onClick={() => this.props.onNavigateRequested(+1)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="20"
                             height="34">
                            <path d="m 1,3 2,-2 16,16 -16,16 -1,-1 15,-15 -15,-15 z"/>
                        </svg>
                    </span>
                </div>
                <style jsx>{`
        :global(li:target .lightbox-content) {
          display: flex;
        }

		.lightbox-content {
			display: flex;
			flex-direction: row;
			flex-shrink: 1;
			flex-grow: 1;
			position: fixed;
			background-image: url(static/whitey-bakgrunn.png);
			top: 5vh;
			bottom: 10vh;
			left: 10vw;
			right: 10vw;
			border: 2px inset black;
			box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
		}

		.lightbox-content .lightbox-center-column {
		    display: flex;
			flex-direction: column;
			flex-shrink: 1;
			flex-grow: 1;
		}

		.lightbox-content .lightbox-controls-left, .lightbox-content .lightbox-controls-right {
		   width: 1em;
		   display: flex;
		   flex-direction: column;
		   justify-content: center;
		   font-size: 18pt;
		   font-weight: bold;
		}

		.lightbox-content .lightbox-controls-row, .lightbox-content .lightbox-controls-bottom {
		  display: flex;
		  flex-direction: row;
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: content;
		  justify-content: flex-end;
		  height: 0.5em;
		  box-sizing: content-box;
		  background: linear-gradient(lightgray, transparent);
		  color: lightgray;
		  padding: 1em;
		}

		.lightbox-content .lightbox-controls-bottom {
		  background: linear-gradient(to top, lightgray, transparent);
		}

        .lightbox-content .image-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
			justify-content: center;
			align-items: center;
			height: calc(100vh - 20em);
         }

         .lightbox-content img {
			flex-shrink: 1;
			flex-grow: 1;
			object-fit: contain;
			display: block;
			max-width: 100%;
		    max-height: calc(100vh - 5em - 5em);
		}



		.lightbox-content .lightbox-controls-left {
		  background: linear-gradient(to right, lightgray, transparent), linear-gradient(to bottom, lightgray, transparent 2em), linear-gradient(to top, lightgray, transparent 2em);
		}

		.lightbox-content .lightbox-controls-right {
		  background: linear-gradient(to left, lightgray, transparent), linear-gradient(to bottom, lightgray, transparent 2em), linear-gradient(to top, lightgray, transparent 2em);
		}

		.lightbox-content .lightbox-controls-row, .lightbox-content .lightbox-controls-left, .lightbox-content .lightbox-controls-right {
		   fill: lightgray;
		}
		.lightbox-content .lightbox-controls-row:hover, .lightbox-content .lightbox-controls-left:hover, .lightbox-content .lightbox-controls-right:hover {
		  color: white;
		  fill: white;
		  background: black;
		  transition: background 1s;
		}

		.lightbox-content p {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: content;
			margin: 0;
			padding: 1em;
			font-size: 18pt;
			font-weight: bold;
		}
		 `}
                </style>
            </div>
        ) || null
    }
}

Lightbox.propTypes = {
    bilde: PropTypes.object,
    open: PropTypes.bool,
    onCloseRequested: PropTypes.func,
    onNavigateRequested: PropTypes.func
};

Lightbox.defaultProps = {
    open: true
};