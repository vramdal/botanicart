// @flow

import "core-js/library/fn/object/assign";
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import BlockContent from '@sanity/block-content-to-react';
import Slideshow from '../components/Slideshow';
import Head from "next/head";
import Gallery from "../components/Gallery";
import Lightbox from "../components/Lightbox";
import imageUrlBuilder from '@sanity/image-url'
import santiyClient from '../lib/sanity';
const builder = imageUrlBuilder(santiyClient);


class Index extends React.Component {


    constructor() {
        super();
        this.state = {fullsizeImageIdxShowing : undefined};
        this.closeLightbox = this.closeLightbox.bind(this);
        this.lightboxImageUrlBuilder = this.lightboxImageUrlBuilder.bind(this);
        this.lightboxImageCaptionProvider = this.lightboxImageCaptionProvider.bind(this);
        this.serializers = this.createSerializers();
    }

    createSerializers(){

        return {
            types: {
                code: props => (
                    <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>),
                galleri: props => {
                    if (props.node.presentation === "slideshow") {
                        return (
                            <Slideshow key={props.node._key}
                                       className="image-frame" slidesClassName={"forside-slide"} displayMs={5000}
                                       slides={props.node.bilder.map((bilde) => (
                                           <React.Fragment>
                                               <img key={bilde._id} src={builder.image(bilde.image).width(600).ignoreImageParams().fit("clip").url()}/>
                                               <p className={"image-caption"}>{bilde.name}</p>
                                               {bilde.latin && <p>{bilde.latin}</p>}
                                           </React.Fragment>))}>

                                <style jsx>{`
                  :global(.image-frame) {
                    margin-top: 1em;
                    border: 3px double #626262;
                    margin: 5px;
                    padding: 3em;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  :global(.forside-slide) {
                    flex-shrink: 3;
                    flex-grow: 1;
                  }
                  :global(.image-frame .image-caption) {
                    font-size: 18pt;
                  }
                    `}
                                </style>
                            </Slideshow>
                        );
                    } else if (props.node.presentation === 'galleri') {
                        return (
                            <React.Fragment>
                                <Gallery className={'galleri'} onGalleryFrameSelect={this.onGalleryFrameSelect.bind(this)} framesClassName={'galleri-bilde'} key={props.node._key}
                                         frames={props.node.bilder.map((bilde) => (
                                    <React.Fragment key={bilde.slug.current}>
                                        <img key={bilde._id} src={builder.image(bilde.image).height(150).url()}/>
                                        <p className={"image-caption"}>{bilde.name}
                                            <span className="latin">{bilde.latin && (` (${bilde.latin})`)}</span>
                                        </p>
                                    </React.Fragment>
                                ))}>
                                    {this.state.fullsizeImageIdxShowing !== undefined &&
                                    <Lightbox bilde={props.node.bilder[this.state.fullsizeImageIdxShowing]}
                                              imageUrlBuilder={this.lightboxImageUrlBuilder}
                                              imageCaptionProvider={this.lightboxImageCaptionProvider}
                                              nesteBilde={props.node.bilder[this.state.fullsizeImageIdxShowing + 1]}
                                              forrigeBilde={props.node.bilder[this.state.fullsizeImageIdxShowing - 1]}
                                              navigated={this.state.navigated}
                                              onCloseRequested={this.closeLightbox}
                                              key={'lightbox-1'}
                                              onNavigateRequested={this.navigateLightbox.bind(this, props.node.bilder)}
                                    />}
                                    <style jsx>{`
                  :global(.galleri) {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    justify-content: space-around;
                  }
                  :global(.galleri-bilde ) {
                    flex-shrink: 3;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-item: center;
                  }
                  :global(.galleri-bilde a) {
                    text-decoration: inherit;
                    color: inherit;
                  }
                  :global(.galleri-bilde .image-caption) {
                    font-size: 14pt;
                  }
                  :global(.galleri-bilde) {
                    margin: 1em;
                    border: 2px solid transparent;
                    padding: 2px;
                    cursor: pointer;
                  }
                  :global(.content) {
                    width: 100%;
                  }



                    `}
                                    </style>

                                </Gallery>

                            </React.Fragment>
                        )
                    } else {
                        console.log("this.props = ", this.props);
                        throw new Error("Ukjent bildeliste-type: " + props.node.presentation);
                    }
                }
            }
        }
    };


    render() {
        return (<Layout menypunkter={this.props.menypunkter} aktivSideSlug={this.props.aktivSideSlug}>
            {this.props.pageContent.tekst && this.props.pageContent.tekst.map(tekstblokk => (
                <BlockContent key={tekstblokk._key} blocks={tekstblokk} serializers={this.serializers}/>
            ))}
            <Head>
            </Head>

        </Layout>);
    }

    onGalleryFrameSelect(frame, idx) {
        console.log("Index.onGalleryFrameSelect", arguments);
        this.setState({fullsizeImageIdxShowing : idx, navigated: undefined});
    }

    lightboxImageUrlBuilder(bilde) {
        return builder.image(bilde.image).url();
    }

    lightboxImageCaptionProvider(bilde) {
        return (
            <React.Fragment>
                {bilde.name}
                <span className="latin">{bilde.latin && (` (${bilde.latin})`)}</span>
            </React.Fragment>
        );
    }

    closeLightbox() {
        this.setState({fullsizeImageIdxShowing : undefined});
/*
        window.setTimeout(() => {
            window.location.hash = "";
        }, 1);

*/
    }

    navigateLightbox(images, delta) {
        let next = (this.state.fullsizeImageIdxShowing + delta) % images.length;
        if (next < 0) {
            next = images.length - 1;
        }
        this.setState({fullsizeImageIdxShowing: next, navigated: delta});
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

}

export default PageWrapper(Index, {forsidebilder: `*[_type=="tegning"] { name, latin, 'slug': slug.current }`})
