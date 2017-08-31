'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

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

        const inputValues = this.props.formData.fields
            .reduce((acc, v) => {
                acc[v] = '';

                return acc;
            }, {});

        this.state = {
            errorText: '',
            inputValues
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({ errorText: '' });

        const { url } = this.props.formData;
        const body = JSON.stringify(this.state.inputValues);

        const options = { body, ...fetchOptions };
        const res = await fetch(url, options);
        const { message, isAuthenticated } = await res.json();
        const errorText = res.status !== 200 ? message : '';

        this.setState({ errorText });
        this.props.onSubmit(isAuthenticated);
    }

    onChange(e) {
        const { name, value } = e.target;
        const newValues = Object.assign(this.state.inputValues, { [name]: value });

        this.setState({
            inputValues: newValues
        });
    }

    render() {
        const { fields, method, text } = this.props.formData;
        const inputs = fields.map(valueName => (
            <input
                className="form__input"
                name={valueName}
                placeholder={valueName}
                value={this.state.inputValues[valueName]}
                type={valueName}
                onChange={this.onChange}
            />
        ));

        return (
            <div>
                <ErrorMessage errorText={this.state.errorText}/>
                <form
                    className="form"
                    method={method}
                    onSubmit={this.onSubmit}
                >
                    {inputs}
                    <input
                        className="form__input form__input--type-submit"
                        type="submit"
                        value={text}
                    />
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string,
        method: PropTypes.string.isRequired
    })
};

Form.defaultValues = {
    text: 'submit'
};
