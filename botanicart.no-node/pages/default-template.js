// @flow

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import BlockContent from '@sanity/block-content-to-react';
import santiyClient from '../lib/sanity';
import imageUrlBuilder from '@sanity/image-url'
import Slideshow from '../components/Slideshow';
import Head from "next/head";

const builder = imageUrlBuilder(santiyClient);

function urlFor(source) {
    return builder.image(source)
}
const serializers = {
    types: {
        code: props => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>),
        galleri: props => (
            <Slideshow key={props.node._key}
                       className="image-frame" slidesClassName={"forside-slide"} displayMs={5000}
                       slides={props.node.bilder.map((bilde, idx) => (<React.Fragment>
                           <img key={bilde._id} src={builder.image(bilde.image).height(400).url()}/>
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
                  :global(.image-caption) {
                    font-size: 18pt;
                  }
                    `}
                </style>
            </Slideshow>
        )
    }
};

class Index extends React.Component {


    render() {
        return (<Layout menypunkter={this.props.menypunkter} aktivSideSlug={this.props.aktivSideSlug}>
            {this.props.pageContent.tekst && this.props.pageContent.tekst.map((tekstblokk, idx) => {
                console.log("tekstblokk = ", tekstblokk);
                return (
                <BlockContent key={tekstblokk._key} blocks={tekstblokk} serializers={serializers} />
            )})}
            <Head>
            </Head>

        </Layout>);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

}

export default PageWrapper(Index, {forsidebilder: `*[_type=="tegning"] { name, latin, 'slug': slug.current }`})
