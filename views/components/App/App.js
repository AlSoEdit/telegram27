'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter } from 'react-router-dom';
import { authNav, notAuthNav } from '../../../constants/routes';

import Header from '../Header/Header';
import PageContent from '../PageContent/PageContent';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.ws = null;
    }

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const { user, responseText } = this.props;
        const links = user ? authNav : notAuthNav;

        return (
            <HashRouter>
                <div className="main">
                    <Header
                        title={'тelegraм'}
                        links={links}
                    />
                    <PageContent
                        user={user}
                        responseText={responseText}
                    />
                </div>
            </HashRouter>
        );
    }
}

App.propTypes = {
    onMount: PropTypes.func.isRequired,
    user: PropTypes.shape({
        login: PropTypes.string.isRequired
    }),
    responseText: PropTypes.string.isRequired
};
