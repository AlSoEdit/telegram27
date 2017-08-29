'use strict';

import React from 'react';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };
    }

    async componentDidMount() {
        const res = await fetch('/profile', {
            method: 'get',
            credentials: 'same-origin',
            Accept: 'application/json'
        });

        const json = await res.json();
        const { login } = json;

        this.setState({
            login
        });
    }

    render() {
        return (
            <p>
                Login: {this.state.login}.
            </p>
        );
    }
}