'use strict';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from '../../reducers';

import Header from '../Header/Header';
import Profile from '../Profile/Profile';

import './App.css';
import Form from '../Form/Form';

const store = createStore(allReducers);

const notAuthenticatedNav = [
    {
        url: '/signin',
        allPaths: ['/signin', '/'],
        text: 'Sign In',
        method: 'post',
        fields: ['login', 'password']
    },
    {
        url: '/signup',
        allPaths: ['/signup'],
        text: 'Sign Up',
        method: 'post',
        fields: ['login', 'password']
    }
];

const authenticatedNav = [
    {
        url: '/profile',
        text: 'Profile',
        method: 'get',
        allPaths: ['/', '/profile']
    },
    {
        url: '/signout',
        text: 'Sign Out',
        method: 'post'
    }
];

const fetchOptions = {
    method: 'post',
    credentials: 'same-origin',
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitRequest = this.onSubmitRequest.bind(this);

        this.state = {
            isAuthenticated: false,
            errorText: ''
        };
    }

    onSubmit(isAuthenticated) {
        this.setState({
            isAuthenticated
        });
    }

    async onSubmitRequest(e) {
        e.preventDefault();

        const options = Object.assign(fetchOptions, { method: e.target.method });
        const res = await fetch(e.target.action, options);
        const { isAuthenticated } = await res.json();

        this.onSubmit(isAuthenticated);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isAuthenticated !== nextState.isAuthenticated;
    }

    render() {
        const { isAuthenticated } = this.state;
        const links = isAuthenticated ? authenticatedNav : notAuthenticatedNav;

        const routes = !isAuthenticated && notAuthenticatedNav.map(s => <Route
                exact
                path={s.url}
                render={() =>
                    <Form
                        isAuthenticated={isAuthenticated}
                        onSubmit={this.onSubmit}
                        formData={s}
                    />
                }
            />
        );

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="main">
                        <Header links={links} isAuthenticated={isAuthenticated} onSubmit={this.onSubmitRequest}/>
                        { isAuthenticated && <Profile/> }
                        {routes}
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}
