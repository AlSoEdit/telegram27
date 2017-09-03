'use strict';

import React from 'react';

import './Profile.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    async componentDidMount() {
        const res = await fetch('/profile', {
            method: 'get',
            credentials: 'same-origin',
            Accept: 'application/json'
        });

        const json = await res.json();
        const { user } = json;

        this.setState({
            user
        });
    }

    render() {
        return (
            <p className="login">
                Login: {this.state.user && this.state.user.login}.
            </p>
        );
    }
}