import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import imageUrlBuilder from '@sanity/image-url'
import santiyClient from '../lib/sanity';
const builder = imageUrlBuilder(santiyClient);

export default class Lightbox extends React.Component {

    render() {
        return (
            <div className={'lightbox-content'}>
                <div className={'lightbox-controls lightbox-controls-left'}>
                    <span className={'button'}>&lt;</span>
                </div>
                <div className={'lightbox-center-column'}>

                    <div className={'lightbox-controls lightbox-controls-row'}>
                        <div className={'close-button'} onClick={this.closeLightbox}>
                            X
                        </div>
                    </div>
                    <div className="image-wrapper">
                        {/*<img key={this.props.bilde._id} src={builder.image(this.props.bilde.image).url()}/>*/}
                    </div>
                    <p className={"lightbox-image-caption"}>{this.props.bilde.name}
                        <span className="latin">{this.props.bilde.latin && (` (${this.props.bilde.latin})`)}</span>
                    </p>
                </div>
                <div className={'lightbox-controls lightbox-controls-right'}>
                    <span className={'button'}>&gt;</span>
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
			outline: 1px solid yellow;
		}

		.lightbox-content .lightbox-center-column {
		    display: flex;
			flex-direction: column;
			flex-shrink: 1;
			flex-grow: 1;
			outline: 1px solid green;
		}

		.lightbox-content .lightbox-controls-left, .lightbox-content .lightbox-controls-right {
		   width: 1em;
		   display: flex;
		   flex-direction: column;
		   justify-content: center;
		   font-size: 18pt;
		   font-weight: bold;
			outline: 1px solid pink;
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
		  outline: 1px solid maroon;
		  background-color: blue;
		}

        .lightbox-content .image-wrapper {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
		    outline: 1px solid cyan;
		    background-color: gray;
			background-image: url('https://cdn.sanity.io/images/n74rrj7w/production/OXcZdH2ua62Q_vHO0Lixe5Vj4tB1koyN57PC7-860x1024.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center center;
         }

		.lightbox-content .lightbox-controls-left {
		  background: linear-gradient(to right, lightgray, transparent);
		}

		.lightbox-content .lightbox-controls-right {
		  background: linear-gradient(to left, lightgray, transparent);
		}

		.lightbox-content .lightbox-controls-row:hover, .lightbox-content .lightbox-controls-left:hover, .lightbox-content .lightbox-controls-right:hover {
		  color: white;
		  background: black;
		  transition: background 1s;
		}

		.lightbox-content img {
			flex-shrink: 1;
			flex-grow: 1;
			object-fit: contain;
			display: block;
			max-width: 100%;
			height: auto;
		    outline: 1px solid red;
		}

		.lightbox-content p {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: content;
			margin: 0;
			padding: 1em;
		    outline: 1px solid blue;
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