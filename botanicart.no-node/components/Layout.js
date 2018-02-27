import Head from 'next/head'
import Link from 'next/link'
import globalStyles from './styles/global'
import styles from './styles/layout'
import Meny from '../components/Meny';
import PropTypes from 'prop-types';

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <Head>
{/*

                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Sanity + Next.js = 💖</title>

*/}
                </Head>
                <h1><a href="."><img src="static/logo.png"/></a></h1>
                <Meny menypunkter={this.props.menypunkter}/>
                <p>Kult!</p>

                <style jsx>{styles}</style>
                <style jsx global>{globalStyles}</style>
            </div>
        )

    }
}

Layout.propTypes = {
    menypunkter: PropTypes.arrayOf(PropTypes.object),
    aktivSideSlug: PropTypes.string
};

