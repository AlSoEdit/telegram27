'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
    render() {
        const components = this.props.links.map(l =>
            <NavLink
                className="nav-link"
                to={l.url}
                key={l.url}
            >
                {l.text}
            </NavLink>
        );

        return (
            <header className="header">
                <span className="header-title">{this.props.title}</span>
                <div className="container">
                    {components}
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            method: PropTypes.string.isRequired
        })
    )
};
