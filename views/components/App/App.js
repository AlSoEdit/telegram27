'use strict';

import React from 'react';
import { HashRouter } from 'react-router-dom';

import Header from '../Header/Header';
import PageContent from '../PageContent/PageContent';

import './App.css';

import {
    fetchOptions,
    notAuthNav,
    authNav
} from '../../../constants/routes';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: null,
            errorText: ''
        };
    }

    async onSubmit({ url, inputValues, method }) {
        const body = ['head', 'get'].includes(method) ? null : JSON.stringify(inputValues);
        const options = { body, ...fetchOptions, method };
        const res = await fetch(url, options);
        try {
            let { text, user } = await res.json();
            const errorText = text || '';
            this.setState({
                user,
                errorText
            });
        } catch (err) {
            this.setState({ errorText: res.statusText });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const authStatusChanged = this.state.user !== nextState.user;
        const errorTextChanged = this.state.errorText !== nextState.errorText;

        return authStatusChanged || errorTextChanged;
    }

    render() {
        const { user, errorText } = this.state;
        const links = user ? authNav : notAuthNav;

        return (
            <HashRouter>
                <div className="main">
                    <Header
                        title={'chat'}
                        links={links}
                        onSubmit={this.onSubmit}
                    />
                    <PageContent
                        user={user}
                        errorText={errorText}
                        onSubmit={this.onSubmit}
                    />
                </div>
            </HashRouter>
        );
    }
}
