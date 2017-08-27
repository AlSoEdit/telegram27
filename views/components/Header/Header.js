'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <span className="header-title">chat</span>
                {/*<div className="links-wrapper">*/}
                {this.props.linksComponent}
                {/*</div>*/}
            </header>
        );
    }
}

Header.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            text: PropTypes.string
        })
    )
};
