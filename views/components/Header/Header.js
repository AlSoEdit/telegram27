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
        const { links } = this.props;
        const components = this.props.isAuthenticated ? (
            links.map(l =>
                <form method={l.method} action={l.url} onSubmit={this.props.onSubmit}>
                    <input className="nav-link" type="submit" value={l.text}/>
                </form>
            )
        ) : (
            links.map(l =>
                <NavLink className="nav-link" to={l.url}>{l.text}</NavLink>
            )
        );

        return (
            <header className="header">
                <span className="header-title">chat</span>
                <div className="container">
                    {components}
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    onSubmit: PropTypes.bool,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            method: PropTypes.string
        })
    )
};
