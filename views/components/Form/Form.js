'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

import FormInput from '../FormInput/FormInput';

const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    method: 'post',
    credentials: 'same-origin'
};

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isAuthenticated: props.isAuthenticated
        };
    }

    async onSubmit(e) {
        e.preventDefault();

        const body = JSON.stringify(
            this.props.inputsNames.reduce((acc, e) => {
                acc[e] = this.state[e];

                return acc;
            }, {})
        );
        const options = { body, ...fetchOptions };

        const res = await fetch(this.props.actionUrl, options);
        const { message, isAuthenticated } = JSON.parse(await res.json());
        const errorText = res.status !== 200 ? message : '';

        this.props.onSubmit(errorText, isAuthenticated);
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated } = nextProps;
        if (isAuthenticated !== this.state.isAuthenticated) {
            this.setState({ isAuthenticated });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const isAuthenticated = this.state;

        return isAuthenticated !== nextProps.isAuthenticated || isAuthenticated !== nextState.isAuthenticated;
    }

    render() {
        const inputs = this.props.inputsNames.map(valueName => (
            <FormInput valueName={valueName} onChange={this.onChange}/>
        ));

        return (
            <form
                className="auth-form"
                method="post"
                onSubmit={this.onSubmit}
            >

                {inputs}

                <input className="input-submit form-input" type="submit" value={this.props.submitText}/>
            </form>
        );
    }
}

Form.propTypes = {
    actionUrl: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    inputsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    submitText: PropTypes.string
};

Form.defaultValues = {
    submitText: 'submit'
};
