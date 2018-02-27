// @flow

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';


class Index extends React.Component {


    render() {
        return (<Layout menypunkter={this.props.menypunkter}>
        </Layout>);

    }

}

export default PageWrapper(Index)
