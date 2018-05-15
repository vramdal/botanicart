import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import imageUrlBuilder from '@sanity/image-url'
import santiyClient from '../lib/sanity';
import objectFitImages from 'object-fit-images';
const builder = imageUrlBuilder(santiyClient);

export default class Lightbox extends React.Component {

    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        this.keyEventHandler = window.addEventListener("keyup", this.handleKey, true);
        objectFitImages(".image-wrapper img");
    }

    componentDidUpdate() {
        objectFitImages(".image-wrapper img");
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
            <React.Fragment>
                <div className={classnames('backdrop')} onClick={this.props.onCloseRequested}>
                    <style jsx>{`
                      div {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-image: url(static/overlay.png);
                      }

                    `}</style>
                </div>
                <div className={classnames('lightbox-content', {'navigated': this.props.navigated !== undefined, 'navigated-forward': this.props.navigated > 0, 'navigated-backward': this.props.navigated < 0})}>
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
                            {this.props.navigated > 0 && this.props.forrigeBilde && <img  className={"navigated-from exit-left"} key={this.props.forrigeBilde._id} src={this.props.imageUrlBuilder(this.props.forrigeBilde)} onClick={this.props.onCloseRequested}/>}
                            <img key={this.props.bilde._id} className={classnames('current-image', {'entry-left': this.props.navigated < 0, 'entry-right': this.props.navigated > 0})} src={this.props.imageUrlBuilder(this.props.bilde)} onClick={this.props.onCloseRequested}/>
                            {this.props.navigated < 0 && this.props.nesteBilde && <img className={"navigated-from exit-right"} key={this.props.nesteBilde._id} src={this.props.imageUrlBuilder(this.props.nesteBilde)} onClick={this.props.onCloseRequested}/>}
                        </div>
                        <div className="hidden-images">
                            {this.props.nesteBilde && <img key={this.props.nesteBilde._id} src={this.props.imageUrlBuilder(this.props.nesteBilde)} onClick={this.props.onCloseRequested}/>}
                            {this.props.forrigeBilde && <img key={this.props.forrigeBilde._id} src={this.props.imageUrlBuilder(this.props.forrigeBilde)} onClick={this.props.onCloseRequested}/>}
                        </div>
                        <p className={"lightbox-image-caption"}>
                            {this.props.imageCaptionProvider(this.props.bilde)}
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

        .hidden-images {
          visibility: hidden;
          position: absolute;
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
            flex-direction: row;
            flex: 1 1 auto;
			justify-content: center;
			align-items: center;
			height: calc(100vh - 10em);
         }

         .lightbox-content .image-wrapper img.navigated-from {
         }

         .exit-left, .exit-right, .entry-left, .entry-right {
            animation-duration: 1s;
            animation-timing-function: ease-out;
         }

         .exit-right, .exit-left {
           animation-fill-mode: forwards;
         }

         .entry-left, .entry-right {
           animation-fill-mode: forwards;
         }

         .exit-left {
            animation-name: exit-left;
         }

         .exit-right {
            animation-name: exit-right;
         }

         .entry-left {
            animation-name: entry-left;
         }

         .entry-right {
            animation-name: entry-right;
         }

         @keyframes exit-right { from { opacity: 1; width: 100%; filter: saturate(1); transform: rotateY(0deg); } to { opacity: 0; width: 0%; filter: saturate(0); transform: rotateY(90deg); } }
         @keyframes exit-left { from { opacity: 1; width: 100%; filter: saturate(1); transform: rotateY(0deg); } to { opacity: 0; width: 0%; ; filter: saturate(0); transform: rotateY(90deg); } }
         @keyframes entry-right { from { opacity: 0;  width: 0%; filter: saturate(0); transform: rotateY(90deg); } to { opacity: 1;  width: 100%;; filter: saturate(1); transform: rotateY(0deg); } }
         @keyframes entry-left { from { opacity: 0; width: 0%; filter: saturate(0); transform: rotateY(90deg); } to { opacity: 1; width: 100%; filter: saturate(1); transform: rotateY(0deg); } }

         .lightbox-content img {
			flex-shrink: 1;
			flex-grow: 1;
			object-fit: contain;
			font-family: 'object-fit: contain;';
			display: block;
			max-width: 100%;
		    max-height: calc(100vh - 20em);
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
            </React.Fragment>
        ) || null
    }
}

Lightbox.propTypes = {
    bilde: PropTypes.object,
    nesteBilde: PropTypes.object,
    forrigeBilde: PropTypes.object,
    open: PropTypes.bool,
    onCloseRequested: PropTypes.func,
    onNavigateRequested: PropTypes.func,
    imageUrlBuilder: PropTypes.func,
    imageCaptionProvider: PropTypes.func,
    navigated: PropTypes.number
};

Lightbox.defaultProps = {
    open: true
};