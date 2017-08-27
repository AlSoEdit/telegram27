'use strict';

import React from 'react';
import Form from '../Form/Form';
import Header from '../Header/Header';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import './App.css';

const notAuthenticatedNav = [
    {
        requestUrl: '/signin',
        allPaths: ['/signin', '/'],
        text: 'Sign In',
        fields: ['login', 'password']
    },
    {
        requestUrl: '/signup',
        allPaths: ['/signup'],
        text: 'Sign Up',
        fields: ['login', 'password']
    }
];

const authenticatedNav = [
    {
        requestUrl: '/profile',
        text: 'Profile',
        allPaths: ['/', '/profile']
    },
    {
        requestUrl: '/signout',
        text: 'Sign Out'
    }
];

const fetchOptions = {
    method: 'post',
    credentials: 'same-origin'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.logoutRequest = this.logoutRequest.bind(this);

        this.state = {
            isAuthenticated: false,
            errorText: ''
        };
    }

    onSubmit(errorText, isAuthenticated) {
        this.setState({
            errorText,
            isAuthenticated
        });
    }

    async logoutRequest(e) {
        e.preventDefault();

        const res = await fetch(e.target.action, fetchOptions);
        const body = JSON.parse(await res.json());
        const { isAuthenticated } = body;
        const message = body.message || '';

        this.onSubmit(message, isAuthenticated);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const errorTextChanged = this.state.errorText !== nextState.errorText;
        const authStatusChanged = this.state.isAuthenticated !== nextState.isAuthenticated;

        return errorTextChanged || authStatusChanged;
    }

    render() {
        const { isAuthenticated, errorText } = this.state;
        const links = isAuthenticated ? authenticatedNav : notAuthenticatedNav;

        const linksComponent = isAuthenticated ? (
            links.map(l =>
                <form method="post" className="links-wrapper" action={l.requestUrl} onSubmit={this.logoutRequest}>
                    <input className="nav-link" type="submit" value={l.text}></input>
                </form>
            )
        ) : (
            <div className="links-wrapper">
                {links.map(l => <NavLink className="nav-link" to={l.requestUrl}>{l.text}</NavLink>)}
            </div>
        );

        const routes = !isAuthenticated && notAuthenticatedNav.reduce((acc, s) =>
            acc.concat(
                s.allPaths.map(p =>
                    <Route
                        exact
                        path={p}
                        render={() =>
                                <Form
                                isAuthenticated={this.state.isAuthenticated}
                                onSubmit={this.onSubmit}
                                actionUrl={s.requestUrl}
                                inputsNames={s.fields}
                                submitText={s.text}
                            />
                        }
                    />
                )
        ), []);

        return (
            <BrowserRouter>
                <div className="main">
                    <Header linksComponent={linksComponent}/>
                    <ErrorMessage errorText={errorText}/>
                    <div className="routes-container">
                        {routes}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
