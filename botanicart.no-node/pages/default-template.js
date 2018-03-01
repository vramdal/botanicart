// @flow

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';


class Index extends React.Component {


    render() {
        return (<Layout menypunkter={this.props.menypunkter}>
            <h1>{this.props.path} {this.props.fisk}</h1>
{/*

            <ul>
                {this.props.forsidebilder && this.props.forsidebilder.map(forsidebilde => <li key={forsidebilde.slug}>{forsidebilde.name}</li>)}
            </ul>

*/}
            {JSON.stringify(this.props.pageContent)}
        </Layout>);

    }

}

export default PageWrapper(Index, {forsidebilder: `*[_type=="tegning"] { name, latin, 'slug': slug.current }`})
