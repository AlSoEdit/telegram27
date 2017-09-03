'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Header.css';
import Form from '../Form/Form';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const components = this.props.links.map(l =>
            <NavLink
                className="nav-link"
                to={l.url}
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
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            method: PropTypes.string
        })
    )
};
