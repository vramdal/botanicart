import sanity from '../lib/sanity';
const menyQuery = `*[_type=="side" && defined(menypunkttekst)] {
   menypunkttekst, 'slug': slug.current, tittel,
  "menypunkt": *[_type=='menypunkt' && references(^._id)]
}`;


export default (WrappedPage, queries) =>
    class extends React.Component {
        static async resolveQueries(queries) {
            if (queries) {
                async function queryResolver(key) {
                    let query = queries[key];
                    return new async function() {
                        let queryResult = await sanity.fetch(query);
                        return {key: key, result: queryResult};
                    };
                }

                let keys = Object.keys(queries);
                let resultMap = {};
                await Promise.all(keys.map(queryResolver))
                    .then(results => results.forEach(resultObj => {
                        resultMap[resultObj.key] = resultObj.result;
                    }));
                return resultMap;
            }
        }
        // noinspection JSUnusedGlobalSymbols
        static async getInitialProps({ pathname, asPath, res }) {
            // https://github.com/sanity-io/block-content-to-react
            if (!res) {
                throw new Error("Serveren sendte ikke noe svar");
            }
            return {
                menypunkter: await sanity.fetch(menyQuery), pathname, ...await this.resolveQueries(queries), path: asPath, pageContent: res.resolvedContent.page,
                aktivSideSlug: res.resolvedContent.page.slug,
                bodyClass: "pagetype-" + res.resolvedContent.page.sidetype
            }
        }
        render() {
            return <WrappedPage {...this.props} aktivSideSlug={this.props.aktivSideSlug} bodyClass={this.props.bodyClass}/>
        }
    }