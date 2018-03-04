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
                    <link rel="icon" href="static/kvitveis-markor.png" type="image/png"/>
                    {this.props.aktivSideSlug === '' &&
                    <style>{`
                    html body {
                      background: url(static/caprifol-bakgrunn.png), url(static/rognebaer-bakgrunn.png), url(static/whitey-bakgrunn.png);
                      min-height: 750px;
                      background-repeat: no-repeat, no-repeat, repeat;
                      background-position: 80% 50px, 20% 100px, left top;
                }
                `}
                    </style>
                    }
{/*

                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Sanity + Next.js = 💖</title>

*/}
                </Head>
                <h1>{this.props.pathname}</h1>
                <h1><a href="."><img src="static/logo.png"/></a></h1>
                <Meny menypunkter={this.props.menypunkter}/>
                <h2 style={{color: 'red'}}>{this.props.aktivSideSlug}</h2>
                <div className="content">
                {this.props.children}
                </div>
                {/*<p>Kult!</p>*/}

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

