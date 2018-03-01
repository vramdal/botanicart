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
        static async getInitialProps({ pathname, asPath, res }) {
            // https://github.com/sanity-io/block-content-to-react
            return {
                menypunkter: await sanity.fetch(menyQuery), pathname, ...await this.resolveQueries(queries), path: asPath, pageContent: res.resolvedContent.page
            }
        }
        render() {
            return <WrappedPage {...this.props}/>
        }
    }