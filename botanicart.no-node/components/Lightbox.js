import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url'
import santiyClient from '../lib/sanity';
const builder = imageUrlBuilder(santiyClient);

export default class Lightbox extends React.Component {

    render() {
        return (
            <div className={'lightbox-content'}>
                <div className={'lightbox-controls lightbox-controls-left'}>
                    <span className={'button'}>
<svg xmlns="http://www.w3.org/2000/svg"
     width="20"
     height="34">
    <path d="m 19,3 -2,-2 -16,16 16,16 1,-1 -15,-15 15,-15 z"/>
</svg>
                    </span>
                </div>
                <div className={'lightbox-center-column'}>

                    <div className={'lightbox-controls lightbox-controls-row'}>
                        <div className={'close-button'} onClick={this.closeLightbox}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="m 1,3 1.25,-1.25 7.5,7.5 7.5,-7.5 1.25,1.25 -7.5,7.5 7.5,7.5 -1.25,1.25 -7.5,-7.5 -7.5,7.5 -1.25,-1.25 7.5,-7.5 -7.5,-7.5 z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="image-wrapper">
                        <img key={this.props.bilde._id} src={builder.image(this.props.bilde.image).url()}/>
                    </div>
                    <p className={"lightbox-image-caption"}>{this.props.bilde.name}
                        <span className="latin">{this.props.bilde.latin && (` (${this.props.bilde.latin})`)}</span>
                    </p>
                </div>
                <div className={'lightbox-controls lightbox-controls-right'}>
                    <span className={'button'}>
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
			height: 100vh;
			max-height: 100vh;
			position: fixed;
			background-image: url(static/whitey-bakgrunn.png);
			top: 0;
			left: 0;
			width: 100%;
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

		.lightbox-content .lightbox-controls-row {
		  display: flex;
		  flex-direction: row;
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: content;
		  justify-content: flex-end;
		  height: 1em;
		  box-sizing: content-box;
		  background: linear-gradient(lightgray, transparent);
		  color: lightgray;
		  padding: 1em;
		}

        .lightbox-content .image-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
			justify-content: center;
			align-items: center;
         }

         .lightbox-content img {
			flex-shrink: 1;
			flex-grow: 1;
			object-fit: contain;
			display: block;
			max-width: 100%;
		    max-height: calc(100vh - 4em);
		}



		.lightbox-content .lightbox-controls-left {
		  background: linear-gradient(to right, lightgray, transparent), linear-gradient(to bottom, lightgray, transparent 2em);
		}

		.lightbox-content .lightbox-controls-right {
		  background: linear-gradient(to left, lightgray, transparent), linear-gradient(to bottom, lightgray, transparent 2em);
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
		}
		 `}
                </style>
            </div>
        )
    }
}

Lightbox.propTypes = {
    bilde: PropTypes.object
};