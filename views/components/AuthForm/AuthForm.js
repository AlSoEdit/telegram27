'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './AuthForm.css';

import FormInput from '../FormInput/FormInput';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const initState = {
    login: '',
    password: '',
    isAuthenticated: false,
    errorText: '',
    fetchOptions: {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        credentials: 'same-origin'
    }
};

export default class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);

        this.state = Object.assign(initState, props);
    }

    handleUserInput(e) {
        const input = e.target;
        this.setState({ [input.name]: input.value });
    }

    async onSubmit(e) {
        e.preventDefault();

        const { login, password } = this.state;
        const body = JSON.stringify({ login, password });
        const options = { body, ...this.state.fetchOptions };

        const res = await fetch(this.props.actionUrl, options);
        const { message, isAuthenticated } = JSON.parse(await res.json());
        const errorText = res.status !== 200 ? message : '';

        this.setState({ errorText, isAuthenticated });
        this.props.setAuthStatus(isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated } = nextProps;
        if (isAuthenticated !== this.state.isAuthenticated) {
            this.setState({ isAuthenticated });
        }
    }

    render() {
        if (this.state.isAuthenticated) {
            return null;
        }

        const { errorText } = this.state;
        const inputs = ['login', 'password', 'submit'].map(valueName =>
            <FormInput
                valueName={valueName}
                parentHandler={this.handleUserInput}
            />
        );

        return (
            <form
                className="auth-form"
                method="post"
                onSubmit={this.onSubmit}
            >
                <label>{this.props.actionUrl}</label>
                {errorText && <ErrorMessage errorText={errorText}/>}
                {inputs}
            </form>
        );
    }
}

AuthForm.propTypes = {
    actionUrl: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    setAuthStatus: PropTypes.func
};