// @flow

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import BlockContent from '@sanity/block-content-to-react';
import santiyClient from '../lib/sanity';
import imageUrlBuilder from '@sanity/image-url'

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
            <div key={props.node._key} className="image-frame slideshow">
                {props.node.bilder.map((bilde, idx) => (<img key={bilde._id} style={{display: (idx === 0 ? '' : 'none')}} className={(idx === 0 ? 'shown' : 'hidden')} src={builder.image(bilde.image).height(200).url()}/>))}
                <style jsx>{`
                  div.image-frame {
                    margin-top: 1em;
                    border: 3px double #626262;
                    margin: 5px;
                    padding: 3em;
                    background-color: white;
                  }
                  img.hidden {
                     opacity: 0;
                  }
                  img.shown {
                     opacity: 1;
                  }
                  img.fadeout {
                    transition-property: opacity;
                    transition-duration: 1s;
                    transition-delay: 0s;
                    transition-timing-function: ease-out;
                    opacity: 0;
                  }
                  img.fadein {
                    visibility: visible;
                    transition-property: opacity;
                    transition-duration: 1s;
                    transition-delay: 0s;
                    transition-timing-function: ease-in;
                    opacity: 1;
                    }
                    `}
                </style>
            </div>
        )
    }
};

class Index extends React.Component {


    render() {
        return (<Layout menypunkter={this.props.menypunkter}>
            {this.props.pageContent.tekst && this.props.pageContent.tekst.map((tekstblokk, idx) => {
                console.log("tekstblokk = ", tekstblokk);
                return (
                <BlockContent key={tekstblokk._key} blocks={tekstblokk} serializers={serializers} />
            )})}

        </Layout>);
    }

    componentDidMount() {
        console.log("Index.componentDidMount", arguments);
        const transitionEndListener = (evt) => {
            const slideshow = evt.currentTarget;
            const images = Array.from(slideshow.querySelectorAll("img"));

            if (images.length > 0) {
                if (evt.propertyName === "opacity" && window.getComputedStyle(evt.target).opacity === "1") {
                    evt.target.classList.add("shown");
                    evt.target.classList.remove("hidden");
                    evt.target.classList.remove("fadein");
                    window.setTimeout(() => {
                        evt.target.classList.add("fadeout");
                    }, 3000);
                    return;
                }

                let currentVisibleIdx = images.findIndex(image => image.classList.contains("shown"));
                if (currentVisibleIdx === -1) {
                    return;
                }
                let nextVisibleIdx = currentVisibleIdx + 1;
                if (nextVisibleIdx >= images.length) {
                    nextVisibleIdx = 0;
                }
                let currentImage = images[currentVisibleIdx];
                let nextImage = images[nextVisibleIdx];
                if (evt.propertyName === "opacity" && window.getComputedStyle(evt.target).opacity === "0") {
                    console.log('Nå er den ute av syne');
                    nextImage.style.display = "";
                    currentImage.style.display = "none";
                    currentImage.classList.remove("fadeout");
                    currentImage.classList.remove("shown");
                    currentImage.classList.add("hidden");
                    window.setTimeout(() => {
                        nextImage.classList.add("fadein");
                    }, 100);

                }            }
            //slideshow.removeEventListener("transitionend", transitionEndListener, true);

        };
        //this.slideshowIntervalHandler = window.setInterval(() => {
        Array.from(document.querySelectorAll(".slideshow")).forEach(slideshow => {
            slideshow.addEventListener("transitionend", transitionEndListener, true);
            slideshow.addEventListener("transitioncancel", (evt) => {
                console.warn("Transition canceled", evt.propertyName, evt.elapsedTime, evt.target);
            }, true);
            const firstImage = slideshow.querySelector("img");
            if (firstImage) {
                console.log('Setter første bilde synlig');
                firstImage.classList.remove("hidden");
                firstImage.classList.add("fadeout");
            }
        });

        //}, 15000);
    }

    componentWillUnmount() {
        window.clearTimeout(this.slideshowIntervalHandler);
    }

}

export default PageWrapper(Index, {forsidebilder: `*[_type=="tegning"] { name, latin, 'slug': slug.current }`})
