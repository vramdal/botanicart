// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class Meny extends Component {

    render() {
        console.log("this.props = ", this.props);
        return (
            <ul className="menu">
                {this.props.menypunkter.map(menypunkt => <li key={menypunkt.slug} className={this.props.aktivSideSlug === menypunkt.slug ? 'active' : ''}>
                    <Link href={menypunkt.slug}><a href={menypunkt.slug}>{menypunkt.menypunkttekst}</a></Link>
                </li>)}
                <style jsx>{`
                    ul.menu {
                        margin: 0;
                        padding: 0;
                    }
                    li.active {
                        background: url(static/kvitveis-markor.png) no-repeat left top;
                    }
                    @media screen and (max-width: 900px) {
ul.menu li {
    margin-right: 0.5em;
}
ul.menu li {
    display: inline-block;
    font-size: 14pt;
    margin-right: 2em;
    margin-left: 0;
    /* font-weight: bold; */
    padding-left: 20px;
    font-family: 'HarabaraHand', sans-serif;
}
}
    `}</style>
            </ul>
        );
    }
}

Meny.propTypes = {
    menypunkter: PropTypes.arrayOf(PropTypes.object),
    aktivSideSlug: PropTypes.string
};

