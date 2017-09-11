'use strict';

import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import './Form.css';

function setInitialValues(fields, hiddenValues) {
    return fields
        .reduce((acc, v) => {
            acc[v] = '';

            return acc;
        }, Object.assign({}, hiddenValues));
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        const inputValues = setInitialValues(this.props.formData.fields, this.props.hiddenInputs);
        this.state = { inputValues };
    }

    componentWillReceiveProps(nextProps) {
        const inputValues = setInitialValues(nextProps.formData.fields, nextProps.hiddenInputs);
        this.setState({ inputValues });
    }

    async onSubmit(e) {
        e.preventDefault();

        const url = e.target.action;
        let { inputValues } = this.state;
        const { method } = e.target;
        const { additionalAction } = this.props.formData;
        const { inputsValidator, onSubmit, onValidationFail } = this.props;

        try {
            if (inputsValidator(inputValues)) {
                onSubmit({ url, method, inputValues, additionalAction });
            }
        } catch (err) {
            onValidationFail(err.message);
        }
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
                key={valueName}
            />
        ));

        return (
            <form
                className={inputs.length === 1 ? 'form form--orientation-horizontal' : 'form'}
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
    inputsValidator: PropTypes.func.isRequired,
    onValidationFail: PropTypes.func,
    additionalAction: PropTypes.func,

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
    inputsValidator: () => true,
    hiddenInputs: []
};
