'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

function setInitialValues(fields, hiddenValues) {
    return fields
        .reduce((acc, v) => {
            acc[v] = '';

            return acc;
        }, Object.assign({}, hiddenValues));
}

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let inputValues = setInitialValues(this.props.formData.fields, this.props.hiddenInputs);
        this.state = { inputValues };
    }

    async onSubmit(e) {
        e.preventDefault();

        const url = e.target.action;
        const { inputValues } = this.state;
        const { method } = e.target;

        this.props.onSubmit({ url, method, inputValues });
        this.setState({
            inputValues: setInitialValues(this.props.formData.fields, this.props.hiddenInputs)
        });
    }

    onChange(e) {
        const { name, value } = e.target;
        const newValues = Object.assign({}, this.state.inputValues, { [name]: value });

        this.setState({ inputValues: newValues });
    }

    render() {
        const { url, fields, method, text } = this.props.formData;
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
            <form
                className={'form'}
                method={method}
                action={url}
                onSubmit={this.onSubmit}
            >
                {inputs}
                <input
                    className={'form__input form__input--type-submit'}
                    type="submit"
                    value={text}
                />
            </form>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLink: PropTypes.bool,
    hiddenInputs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
        })
    ),
    formData: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string,
        method: PropTypes.string.isRequired
    })
};

Form.defaultProps = {
    text: 'submit',
    hiddenInputs: [],
    formData: {
        fields: []
    }
};
