import sanity from '../lib/sanity';
const menyQuery = `*[_type=="side"] {
   menypunkttekst, 'slug': slug.current, tittel,
  "menypunkt": *[_type=='menypunkt' && references(^._id)]
}`;


export default WrappedPage =>
    class extends React.Component {
        static async getInitialProps({ pathname }) {
            async function resolveQueries() {
                if (WrappedPage.queries) {
                    let results = {};
                    Object.keys(WrappedPage.queries).forEach(key => {
                        let query = WrappedPage.queries[key];
                        results[key] = sanity.fetch(query)
                    });
                }
            }
            return {
                menypunkter: await sanity.fetch(menyQuery), pathname, queryResults: await resolveQueries()
            }
        }
        render() {
            return <WrappedPage pathname={this.props.pathname} menypunkter={this.props.menypunkter} queryResults={this.props.queryResults}/>
        }
    }